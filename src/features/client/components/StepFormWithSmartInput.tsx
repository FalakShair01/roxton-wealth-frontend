'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartInput } from './SmartInput';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FORM_DATA, FormField } from '@/constants/form-data';

const schema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  preferred_name: z.string().optional(),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(10)
});

type FormSchema = z.infer<typeof schema>;

export const StepFormWithSmartInput = () => {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const [step, setStep] = useState(0);

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors }
  } = methods;

  const currentFields = FORM_DATA[step];

  // 🔹 Flatten fields if inside sections
  const allFields =
    (currentFields as any).fields ??
    (currentFields as any).sections?.flatMap((s: any) => s.fields) ??
    [];

  const onSubmit = (data: FormSchema) => {
    console.log('Final Submitted Data', data);
  };

  const handleNext = () => {
    if (step < FORM_DATA.length - 1) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <style>
        {`
    .scrollbar-premium {
      scrollbar-width: thin;
      scrollbar-color: #b0b8c3 transparent;
    }
    .scrollbar-premium::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .scrollbar-premium::-webkit-scrollbar-track {
      background: transparent;
    }
    .scrollbar-premium::-webkit-scrollbar-thumb {
      background-color: #cbd5e1;
      border-radius: 9999px;
      border: 2px solid transparent;
      background-clip: content-box;
    }
    .scrollbar-premium::-webkit-scrollbar-thumb:hover {
      background-color: #94a3b8;
    }
    .dark .scrollbar-premium::-webkit-scrollbar-thumb {
      background-color: #64748b;
    }
    .dark .scrollbar-premium::-webkit-scrollbar-thumb:hover {
      background-color: #475569;
    }
  `}
      </style>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur transition-[box-shadow,transform,border-color] duration-200 focus-within:-translate-y-[1px] focus-within:shadow-md hover:shadow-md dark:border-gray-800 dark:bg-gray-950/80 dark:hover:shadow-lg/30'>
          <div className='scrollbar-premium max-h-[calc(100vh-200px)] overflow-y-auto pr-2'>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [@media(min-width:1440px)]:grid-cols-4'>
              {allFields.length === 0 ? (
                <p className='text-sm text-gray-500'>
                  No fields found for this step.
                </p>
              ) : (
                allFields.map((field: FormField) => (
                  <SmartInput
                    key={field.name}
                    field={{
                      ...field,
                      defaultValue: getValues(field.name as keyof FormSchema),
                      error: errors[field.name as keyof FormSchema]?.message,
                      onChange: (val) =>
                        setValue(field.name as keyof FormSchema, val, {
                          shouldValidate: true
                        })
                    }}
                  />
                ))
              )}
            </div>

            <div className='mt-6 flex items-center justify-between pt-4'>
              {step > 0 ? (
                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleBack}
                  className='rounded-lg !bg-gray-200 text-gray-800 focus-visible:ring-2'
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
      </form>
    </FormProvider>
  );
};
