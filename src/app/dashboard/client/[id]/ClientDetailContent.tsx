'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartInput } from '@/features/client/components/SmartInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FORM_DATA, FormField } from '@/constants/form-data';
import CourseProgressCard from '@/features/client/components/CourseProgressCard';
import { zodFromFields } from '@/validation/segmentSchema'; // ✅ your util
import { ClientDetail } from '@/constants/mock-clients-detail';

// ---------- keep your helpers ----------
function flattenAllFields(data: any[]): FormField[] {
  return data.flatMap(
    (step: any) =>
      (step.fields ??
        step.sections?.flatMap((s: any) => s.fields) ??
        []) as FormField[]
  );
}

function defaultsFromFields(fields: FormField[]) {
  const d: Record<string, any> = {};
  for (const f of fields) {
    if (d[f.name] !== undefined) continue;
    switch (f.input_type) {
      case 'input_checklist':
        d[f.name] = Array.isArray(f.value) ? f.value : [];
        break;
      case 'file':
        d[f.name] = null;
        break;
      default:
        d[f.name] = typeof f.value === 'number' ? f.value : (f.value ?? '');
    }
  }
  return d;
}

type AnyRec = Record<string, any>;

const YES_NO_KEYS = new Set([
  'valid_will',
  'dependent_on_partner',
  'politically_exposed_person',
  'uk_sanction_entity',
  'financial_dependents',
  'summary_income',
  'summary_properties',
  'summary_protection',
  'summary_other_liabilities',
  'summary_previous_debt_consolidation',
  'has_adverse_credit_history',
  'loan_application_refused',
  'pep_or_linked',
  'joint_dependent'
]);

function toYesNo(v: any) {
  if (typeof v === 'number') return v > 0 ? 'yes' : 'no';
  if (typeof v === 'string') {
    const s = v.trim().toLowerCase();
    if (['yes', 'y', 'true', '1'].includes(s)) return 'yes';
    if (['no', 'n', 'false', '0', ''].includes(s)) return 'no';
    // non-empty free text (e.g. summary strings) -> yes
    return 'yes';
  }
  return 'no';
}

function isoDate(d: any) {
  if (!d) return '';
  const x = new Date(d);
  if (isNaN(x.getTime())) return String(d);
  const mm = String(x.getMonth() + 1).padStart(2, '0');
  const dd = String(x.getDate()).padStart(2, '0');
  return `${x.getFullYear()}-${mm}-${dd}`;
}

export function normaliseClientDetailForForm(src: AnyRec): AnyRec {
  const out: AnyRec = { ...src };

  // ---- dates to YYYY-MM-DD
  Object.keys(out).forEach((k) => {
    if (
      /_date$|date_of_birth|dependent_dob|employment_start_date|date_of_issue|expiry_date/i.test(
        k
      )
    ) {
      out[k] = isoDate(out[k]);
    }
  });

  // ---- venue/client status
  if (typeof out.meeting_venue === 'string') {
    const s = out.meeting_venue.toLowerCase();
    out.meeting_venue = s.includes('client')
      ? 'face_to_face'
      : s.includes('video')
        ? 'video_conference'
        : 'face_to_face';
  }
  if (typeof out.client_status === 'string') {
    const s = out.client_status.toLowerCase();
    out.client_status = s === 'active' ? 'current_client' : 'legacy_client';
  }

  // ---- contact methods/checklists
  if (Array.isArray(out.contact_method)) {
    out.contact_method = out.contact_method.map((v: string) => {
      const s = v.toLowerCase();
      if (s === 'email') return 'correspondence_email';
      return s; // phone/post/sms/any already lowercase works
    });
  }

  // ---- radios with allow/dont_allow
  out.correspondence_email = 'allow'; // you provided an address, so allow
  out.servicing_emails =
    out.servicing_emails?.toLowerCase() === 'yes' ? 'allow' : 'dont_allow';
  out.post_advertising =
    out.post_advertising?.toLowerCase() === 'yes' ? 'allow' : 'dont_allow';

  // ---- employment, id types already ok except casing
  if (typeof out.employment_type === 'string')
    out.employment_type = out.employment_type.toLowerCase();

  // ---- YES/NO radios
  // for (const k of YES_NO_KEYS) if (k in out) out[k] = toYesNo(out[k]);
  Array.from(YES_NO_KEYS).forEach((k) => {
    if (k in out) out[k] = toYesNo(out[k]);
  });

  // ---- special cases already aligned
  // type_of_id: driving_license (good)
  // verification_method: face_to_face (good)

  return out;
}

function isFormField(
  item: FormField | { sub_title: string; fields: FormField[] }
): item is FormField {
  return (item as FormField).input_type !== undefined;
}

export default function ClientDetailContent({ data }: { data: ClientDetail }) {
  const allFormFields = useMemo(() => flattenAllFields(FORM_DATA), []);
  const schema = useMemo(() => zodFromFields(allFormFields), [allFormFields]);

  // base defaults from your form definition
  const baseDefaults = useMemo(
    () => defaultsFromFields(allFormFields),
    [allFormFields]
  );

  // initialise once with base defaults
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: baseDefaults,
    shouldUnregister: false // keep values when sections unmount
  });

  const {
    reset,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors }
  } = methods;

  // 🔑 when the record changes, merge & reset
  // const baseDefaults = useMemo(() => defaultsFromFields(allFormFields), [allFormFields]);

  useEffect(() => {
    if (!data) return;
    const merged = { ...baseDefaults, ...data };
    const normalised = normaliseClientDetailForForm(merged);
    reset(normalised, { keepErrors: true });
  }, [data?.id, baseDefaults, reset]);

  console.log('baseDefaults:', baseDefaults);

  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [title, setTitle] = useState(FORM_DATA[0]?.title ?? '');
  const [subTitle, setSubTitle] = useState(
    FORM_DATA[0].sections?.[0]?.sub_title ?? ''
  );

  const currentStep = FORM_DATA[step];
  const allFieldsThisStep: FormField[] = (currentStep as any).sections[subStep]
    .fields;

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('Final Submitted Data', data);
  };

  const currentFields = FORM_DATA[step];

  const handleNext = async () => {
    const fieldNames = allFieldsThisStep.map((f) => f.name); // Only current step's fields
    const ok = await trigger(fieldNames);
    if (!ok) return;

    const stepValues = getValues(fieldNames);

    const curr = FORM_DATA[step];

    // go to next sub-step if this step has sections
    if (Array.isArray(curr?.sections) && subStep < curr.sections.length - 1) {
      const nextSub = subStep + 1;
      setSubStep(nextSub);
      setSubTitle(curr.sections[nextSub]?.sub_title ?? '');
      return;
    }

    // otherwise advance to next step
    if (step < FORM_DATA.length - 1) {
      const nextStep = step + 1;
      const next = FORM_DATA[nextStep];
      setStep(nextStep);
      setTitle(next?.title ?? '');
      const hasSections =
        Array.isArray(next?.sections) && next.sections.length > 0;
      setSubStep(0);
      setSubTitle(
        hasSections && next.sections ? (next.sections[0]?.sub_title ?? '') : ''
      );
    }
  };

  const handleBack = () => {
    const curr = FORM_DATA[step];

    // 1) Go back within current step if there are sub-steps
    if (Array.isArray(curr?.sections) && subStep > 0) {
      const prevSub = subStep - 1;
      setSubStep(prevSub);
      setSubTitle(curr.sections[prevSub]?.sub_title ?? '');
      return;
    }

    // 2) Otherwise go to previous step (if any)
    if (step < FORM_DATA.length - 1) {
      const nextStep = step + 1;
      const next = FORM_DATA[nextStep];
      setStep(nextStep);
      setTitle(next?.title ?? '');
      const hasSections =
        Array.isArray(next?.sections) && next.sections.length > 0;
      setSubStep(0);
      setSubTitle(
        hasSections && next.sections ? (next.sections[0]?.sub_title ?? '') : ''
      );
    }
  };

  return (
    <>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold tracking-tight'>{`${title} ${subTitle ? ' / ' + subTitle : ''}`}</h2>
      </div>

      <div className='flex min-h-screen flex-row gap-4'>
        {/* Left: Step Form (70%) */}
        <div
          className='h-[calc(100vh-var(--header-h))] w-[70%] min-w-[70%]'
          style={{
            // set this to your actual header height
            // @ts-ignore
            '--header-h': '120px'
          }}
        >
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex h-full flex-col'
            >
              <div className='flex h-full flex-col rounded-xl border p-6 shadow-sm backdrop-blur'>
                {/* scrollable content fills remaining space */}
                <div className='min-h-0 flex-1 overflow-y-auto pr-2'>
                  <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [@media(min-width:1440px)]:grid-cols-4'>
                    {Array.isArray(currentFields.fields) &&
                      (
                        currentFields.fields as (
                          | FormField
                          | { sub_title: string; fields: FormField[] }
                        )[]
                      )
                        .filter(isFormField)
                        .map((field) => (
                          <SmartInput
                            key={field.name}
                            field={{
                              ...field,
                              defaultValue: getValues(field.name as string),
                              error: String(
                                (errors as any)[field.name]?.message ?? ''
                              ),
                              onChange: (val) =>
                                setValue(field.name as string, val, {
                                  shouldValidate: true
                                }),
                              disabled: true
                            }}
                          />
                        ))}
                    {currentFields.sections &&
                      currentFields.sections[subStep].fields?.map(
                        (field: FormField) => (
                          <SmartInput
                            key={field.name}
                            field={{
                              ...field,
                              defaultValue: getValues(field.name as string),
                              error: String(
                                (errors as any)[field.name]?.message ?? ''
                              ),
                              onChange: (val) =>
                                setValue(field.name as string, val, {
                                  shouldValidate: true
                                }),
                              disabled: true
                            }}
                          />
                        )
                      )}
                  </div>

                  {/* actions (optional: make sticky so they’re always visible) */}
                  <div className='sticky bottom-0 mt-6 pt-4 backdrop-blur'>
                    <div className='flex items-center justify-between'>
                      {step > 0 || subStep > 0 ? (
                        <Button
                          type='button'
                          variant='secondary'
                          onClick={handleBack}
                          className='rounded-lg !bg-gray-200 text-gray-800'
                        >
                          Back
                        </Button>
                      ) : (
                        <div />
                      )}

                      {step < FORM_DATA.length - 1 ? (
                        <Button
                          type='button'
                          onClick={handleNext}
                          className='bg-primary mr-2 rounded-lg text-white'
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          type='submit'
                          className='bg-primary rounded-lg text-white'
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Right: Course Progress (30%) */}
        <div
          className='h-[calc(100vh-var(--header-h))] w-[30%] min-w-[30%]'
          style={{
            // set this to your actual header height
            // @ts-ignore
            '--header-h': '120px'
          }}
        >
          <div className='grid h-full grid-cols-1 gap-4'>
            <CourseProgressCard step={step} subStep={subStep} />
          </div>
        </div>
      </div>
    </>
  );
}
