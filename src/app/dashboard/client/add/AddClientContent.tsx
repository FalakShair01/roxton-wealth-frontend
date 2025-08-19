'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartInput } from '@/features/client/components/SmartInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FORM_DATA, FormField } from '@/constants/form-data';
import CourseProgressCard from '@/features/client/components/CourseProgressCard';
import { zodFromFields } from '@/validation/segmentSchema'; // ✅ your util

// ---------- helpers ----------
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
      case 'input_dropdown':
      case 'input_date':
      case 'input_textarea':
      case 'input_string':
      case 'input_number':
        d[f.name] = typeof f.value === 'string' ? f.value : '';
        break;
      case 'file':
        d[f.name] = null;
        break;
      default:
        d[f.name] = '';
    }
  }
  return d;
}

function isFormField(
  item: FormField | { sub_title: string; fields: FormField[] }
): item is FormField {
  return (item as FormField).input_type !== undefined;
}

export default function AddClientContent() {
  // 🔹 Build global schema once from all fields (steps + sections)
  const allFormFields = useMemo(() => flattenAllFields(FORM_DATA), []);
  const schema = useMemo(() => zodFromFields(allFormFields), [allFormFields]);

  // 🔹 Defaults from fields
  const defaultValues = useMemo(
    () => defaultsFromFields(allFormFields),
    [allFormFields]
  );

  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [title, setTitle] = useState(FORM_DATA[0]?.title ?? '');
  const [subTitle, setSubTitle] = useState(
    FORM_DATA[0].sections?.[0]?.sub_title ?? ''
  );

  // ✅ Hook with your zod resolver + defaults
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    trigger, // <-- for step-wise validation
    formState: { errors }
  } = methods;

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
    console.log('Current Step Values:', stepValues, 'fieldNames:', fieldNames);

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
                                })
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
                                })
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
