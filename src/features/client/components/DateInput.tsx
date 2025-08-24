// 'use client';

// import * as Popover from '@radix-ui/react-popover';
// import { useFormContext } from 'react-hook-form';
// import { Label } from '@/components/ui/label';
// import { cn } from '@/lib/utils';
// import { DayPicker } from 'react-day-picker';
// import { format } from 'date-fns';
// import 'react-day-picker/dist/style.css';
// import { useMemo, useState } from 'react';
// import { IconCalendar } from '@tabler/icons-react';

// interface Props {
//   name: string;
//   label: string;
//   required?: boolean;
//   disabled?: boolean; // optional: to disable the input
//   placeholder?: string;
//   disabledBefore?: Date; // optional: min date
//   disabledAfter?: Date; // optional: max date
// }

// export function DateInput({
//   name,
//   label,
//   required,
//   disabled = false,
//   placeholder = 'Select date',
//   disabledBefore,
//   disabledAfter
// }: Props) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors }
//   } = useFormContext();
//   const selectedISO = watch(name) as string | undefined;
//   const selectedDate = useMemo(
//     () => (selectedISO ? new Date(selectedISO) : undefined),
//     [selectedISO]
//   );
//   const [open, setOpen] = useState(false);
//   const hasError = !!errors[name];

//   // disabled range (optional)
//   const disabledDate = useMemo(() => {
//     const arr: any[] = [];
//     if (disabledBefore) arr.push({ before: disabledBefore });
//     if (disabledAfter) arr.push({ after: disabledAfter });
//     return arr;
//   }, [disabledBefore, disabledAfter]);

//   return (
//     <div className='space-y-1.5'>
//       <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
//         {label} {required && <span className='text-red-500'>*</span>}
//       </Label>

//       <Popover.Root open={open} onOpenChange={setOpen}>
//         <Popover.Trigger
//           className={cn(
//             'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
//             hasError && 'border-red-500 focus:ring-red-500',
//             disabled && 'cursor-not-allowed opacity-50'
//           )}
//           disabled={disabled}
//         >
//           <span className={cn(!selectedDate && 'text-gray-400')}>
//             {selectedDate ? format(selectedDate, 'PPP') : placeholder}
//           </span>
//           <IconCalendar className='h-4 w-4 text-gray-500' />
//         </Popover.Trigger>

//         <Popover.Content
//           sideOffset={6}
//           className='z-50 mt-2 rounded-xl border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-900'
//         >
//           <DayPicker
//             mode='single'
//             selected={selectedDate}
//             onSelect={(d) => {
//               setValue(name, d ? d.toISOString() : '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//               });
//               setOpen(false);
//             }}
//             disabled={disabledDate}
//             // nice UI tuning
//             classNames={{
//               caption: 'flex justify-center font-medium',
//               head_cell: 'text-xs text-gray-500 dark:text-gray-400 w-9',
//               day: cn(
//                 'w-6 rounded-sm text-sm',
//                 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
//               ),
//               // day_selected: 'bg-primary-600 text-white',
//               day_today: 'border border-blue-400',
//               nav: 'flex items-center',
//               nav_button: 'h-8 w-8 rounded-md '
//             }}
//           />
//         </Popover.Content>
//       </Popover.Root>

//       {/* hidden field to integrate with RHF */}
//       <input
//         type='hidden'
//         {...register(name, {
//           required: required ? `${label} is required` : false
//         })}
//       />

//       {hasError && (
//         <p className='text-xs text-red-600 dark:text-red-500'>
//           {String(errors[name]?.message)}
//         </p>
//       )}
//     </div>
//   );
// }

// 'use client';

// import * as Popover from '@radix-ui/react-popover';
// import { useFormContext } from 'react-hook-form';
// import { Label } from '@/components/ui/label';
// import { cn } from '@/lib/utils';
// import { DayPicker } from 'react-day-picker';
// import { format } from 'date-fns';
// import 'react-day-picker/dist/style.css';
// import { useMemo, useState } from 'react';
// import { IconCalendar } from '@tabler/icons-react';

// interface Props {
//   name: string;
//   label: string;
//   required?: boolean;
//   disabled?: boolean; // optional: to disable the input
//   placeholder?: string;
//   disabledBefore?: Date; // optional: min date
//   disabledAfter?: Date; // optional: max date
// }

// export function DateInput({
//   name,
//   label,
//   required,
//   disabled = false,
//   placeholder = 'Select date',
//   disabledBefore,
//   disabledAfter
// }: Props) {
//   const {
//     register,
//     setValue,
//     watch,
//     formState: { errors }
//   } = useFormContext();
//   const selectedISO = watch(name) as string | undefined;
//   const selectedDate = useMemo(
//     () => (selectedISO ? new Date(selectedISO) : undefined),
//     [selectedISO]
//   );
//   const [open, setOpen] = useState(false);
//   const hasError = !!errors[name];

//   // disabled range (optional)
//   const disabledDate = useMemo(() => {
//     const arr: any[] = [];
//     if (disabledBefore) arr.push({ before: disabledBefore });
//     if (disabledAfter) arr.push({ after: disabledAfter });
//     return arr;
//   }, [disabledBefore, disabledAfter]);

//   return (
//     <div className='space-y-1.5'>
//       <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
//         {label} {required && <span className='text-red-500'>*</span>}
//       </Label>

//       <Popover.Root open={open} onOpenChange={setOpen}>
//         <Popover.Trigger
//           className={cn(
//             'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
//             hasError && 'border-red-500 focus:ring-red-500',
//             disabled && 'cursor-not-allowed opacity-50'
//           )}
//           disabled={disabled}
//         >
//           <span className={cn(!selectedDate && 'text-gray-400')}>
//             {selectedDate ? format(selectedDate, 'PPP') : placeholder}
//           </span>
//           <IconCalendar className='h-4 w-4 text-gray-500' />
//         </Popover.Trigger>

//         <Popover.Content
//           sideOffset={6}
//           className='z-50 mt-2 rounded-xl border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-900'
//         >
//           <DayPicker
//             mode='single'
//             selected={selectedDate}
//             onSelect={(d) => {
//               setValue(name, d ? d.toISOString() : '', {
//                 shouldValidate: true,
//                 shouldDirty: true
//               });
//               setOpen(false);
//             }}
//             disabled={disabledDate}
//             // nice UI tuning
//             classNames={{
//               caption: 'flex justify-center font-medium',
//               head_cell: 'text-xs text-gray-500 dark:text-gray-400 w-9',
//               day: cn(
//                 'w-6 rounded-sm text-sm',
//                 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
//               ),
//               // day_selected: 'bg-primary-600 text-white',
//               day_today: 'border border-blue-400',
//               nav: 'flex items-center',
//               nav_button: 'h-8 w-8 rounded-md '
//             }}
//           />
//         </Popover.Content>
//       </Popover.Root>

//       {/* hidden field to integrate with RHF */}
//       <input
//         type='hidden'
//         {...register(name, {
//           required: required ? `${label} is required` : false
//         })}
//       />

//       {hasError && (
//         <p className='text-xs text-red-600 dark:text-red-500'>
//           {String(errors[name]?.message)}
//         </p>
//       )}
//     </div>
//   );
// }

'use client';

import * as Popover from '@radix-ui/react-popover';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DayPicker } from 'react-day-picker';
import {
  format,
  parse,
  isValid,
  isBefore,
  isAfter,
  startOfMonth,
  endOfMonth,
  subDays
} from 'date-fns';
import { enGB } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { useMemo, useState, useRef } from 'react';
import {
  IconCalendar,
  IconX,
  IconChevronLeft,
  IconChevronRight
} from '@tabler/icons-react';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  disabledBefore?: Date;
  disabledAfter?: Date;
  formatString?: string; // e.g. 'dd/MM/yyyy'
  showPresets?: boolean;
  yearRange?: { start: number; end: number };
  disableDate?: (d: Date) => boolean;
}

export function DateInput({
  name,
  label,
  required,
  disabled = false,
  placeholder = 'Select date',
  disabledBefore,
  disabledAfter,
  formatString = 'dd/MM/yyyy',
  showPresets = true,
  yearRange = { start: 1900, end: new Date().getFullYear() + 10 },
  disableDate
}: Props) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();

  const selectedISO = watch(name) as string | undefined;
  const selectedDate = useMemo(
    () => (selectedISO ? new Date(selectedISO) : undefined),
    [selectedISO]
  );
  const [open, setOpen] = useState(false);
  const hasError = !!errors[name];
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isDisabled = (date: Date) => {
    if (disabledBefore && isBefore(date, disabledBefore)) return true;
    if (disabledAfter && isAfter(date, disabledAfter)) return true;
    if (disableDate && disableDate(date)) return true;
    return false;
  };

  const tryParseAndSet = (text: string) => {
    const candidates = [formatString, 'yyyy-MM-dd', 'dd-MM-yyyy', 'MM/dd/yyyy'];
    for (const fmt of candidates) {
      const d = parse(text, fmt, new Date());
      if (isValid(d) && !isDisabled(d)) {
        setValue(name, d.toISOString(), {
          shouldValidate: true,
          shouldDirty: true
        });
        setOpen(false);
        return;
      }
    }
  };

  const presets = [
    { label: 'Today', get: () => new Date() },
    { label: 'Yesterday', get: () => subDays(new Date(), 1) },
    { label: 'Start of month', get: () => startOfMonth(new Date()) },
    { label: 'End of month', get: () => endOfMonth(new Date()) }
  ];

  return (
    <div className='space-y-1.5'>
      <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          className={cn(
            'flex w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm dark:bg-transparent',
            'focus:ring-2 focus:ring-black/10 focus:outline-none dark:focus:ring-white/10',
            hasError && 'border-red-500 focus:ring-red-500',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          disabled={disabled}
          aria-invalid={hasError || undefined}
        >
          <span className={cn(!selectedDate && 'text-gray-400')}>
            {selectedDate
              ? format(selectedDate, formatString, { locale: enGB })
              : placeholder}
          </span>
          <IconCalendar className='h-4 w-4 text-gray-500' />
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            align='start'
            className='z-50 w-[320px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900'
          >
            {/* Header: manual input + clear */}
            <div className='flex items-center gap-2 border-b p-2 dark:border-gray-700'>
              <input
                ref={inputRef}
                type='text'
                placeholder={`Type a date (${formatString})`}
                className={cn(
                  'w-full rounded-md border px-2 py-1.5 text-sm outline-none',
                  'focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10',
                  'dark:border-gray-700 dark:bg-transparent'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter')
                    tryParseAndSet((e.target as HTMLInputElement).value);
                }}
              />
              {selectedDate && (
                <button
                  type='button'
                  className='rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={() =>
                    setValue(name, '', {
                      shouldDirty: true,
                      shouldValidate: true
                    })
                  }
                  title='Clear'
                >
                  <IconX className='h-4 w-4' />
                </button>
              )}
            </div>

            <DayPicker
              mode='single'
              selected={selectedDate}
              onSelect={(d) => {
                setValue(name, d ? d.toISOString() : '', {
                  shouldValidate: true,
                  shouldDirty: true
                });
                setOpen(false);
              }}
              locale={enGB}
              weekStartsOn={1}
              showOutsideDays
              captionLayout='dropdown'
              fromYear={yearRange.start}
              toYear={yearRange.end}
              disabled={isDisabled}
              components={{
                IconLeft: () => <IconChevronLeft className='h-4 w-4' />,
                IconRight: () => <IconChevronRight className='h-4 w-4' />
              }}
              className='rdp'
              classNames={{
                caption: 'flex justify-center py-2 gap-2',
                caption_dropdowns: 'flex gap-1',
                nav: 'flex items-center',
                table: 'w-full border-collapse',
                head_row: 'grid grid-cols-7',
                head_cell:
                  'h-8 w-8 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center',
                row: 'grid grid-cols-7',
                cell: 'p-0',
                day: cn(
                  'h-9 w-9 m-1 inline-flex items-center justify-center rounded-md text-sm',
                  'hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10'
                ),
                day_selected:
                  'bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white',
                day_today: 'ring-1 ring-black/20 dark:ring-white/20',
                day_outside: 'text-gray-400 dark:text-gray-500'
              }}
              footer={
                <div className='flex items-center justify-between gap-2 border-t p-2 text-xs dark:border-gray-700'>
                  <button
                    type='button'
                    className='rounded-md border px-2.5 py-1 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                    onClick={() =>
                      setValue(name, '', {
                        shouldDirty: true,
                        shouldValidate: true
                      })
                    }
                  >
                    Clear
                  </button>

                  {showPresets && (
                    <div className='flex flex-wrap gap-1'>
                      {presets.map((p) => {
                        const d = p.get();
                        const disabledItem = isDisabled(d);
                        return (
                          <button
                            key={p.label}
                            type='button'
                            disabled={disabledItem}
                            className={cn(
                              'rounded-md border px-2 py-1 hover:bg-gray-50 disabled:opacity-50',
                              'dark:border-gray-700 dark:hover:bg-gray-800'
                            )}
                            onClick={() =>
                              setValue(name, d.toISOString(), {
                                shouldDirty: true,
                                shouldValidate: true
                              })
                            }
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              }
            />

            <div className='flex justify-end p-2'>
              <Popover.Close
                className='rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800'
                aria-label='Close'
              >
                Close
              </Popover.Close>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {/* hidden field to integrate with RHF */}
      <input
        type='hidden'
        {...register(name, {
          required: required ? `${label} is required` : false
        })}
      />

      {hasError && (
        <p className='text-xs text-red-600 dark:text-red-500'>
          {String((errors as any)[name]?.message)}
        </p>
      )}
    </div>
  );
}
