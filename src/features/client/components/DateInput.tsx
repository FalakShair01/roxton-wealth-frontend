'use client';

import * as Popover from '@radix-ui/react-popover';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useMemo, useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean; // optional: to disable the input
  placeholder?: string;
  disabledBefore?: Date; // optional: min date
  disabledAfter?: Date; // optional: max date
}

export function DateInput({
  name,
  label,
  required,
  disabled = false,
  placeholder = 'Select date',
  disabledBefore,
  disabledAfter
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

  // disabled range (optional)
  const disabledDate = useMemo(() => {
    const arr: any[] = [];
    if (disabledBefore) arr.push({ before: disabledBefore });
    if (disabledAfter) arr.push({ after: disabledAfter });
    return arr;
  }, [disabledBefore, disabledAfter]);

  return (
    <div className='space-y-1.5'>
      <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          className={cn(
            'flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm',
            '!border-gray-700',
            hasError && 'border-red-500 focus:ring-red-500',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          disabled={disabled}
        >
          <span className={cn(!selectedDate && 'text-gray-400')}>
            {selectedDate ? format(selectedDate, 'PPP') : placeholder}
          </span>
          <IconCalendar className='h-4 w-4 text-gray-500' />
        </Popover.Trigger>

        <Popover.Content
          sideOffset={6}
          className='z-50 mt-2 rounded-xl border border-gray-200 shadow-xl dark:border-gray-700 dark:bg-gray-900'
        >
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
            disabled={disabledDate}
            // nice UI tuning
            classNames={{
              caption: 'flex justify-center font-medium',
              head_cell: 'text-xs text-gray-500 dark:text-gray-400 w-9',
              day: cn(
                'w-6 rounded-sm text-sm',
                'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              ),
              // day_selected: 'bg-primary-600 text-white',
              day_today: 'border border-blue-400',
              nav: 'flex items-center',
              nav_button: 'h-8 w-8 rounded-md '
            }}
          />
        </Popover.Content>
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
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
