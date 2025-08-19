'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type Option = { label: string; value: string };

interface DropdownInputProps {
  name: string;
  label: string;
  value?: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; // optional: to disable the input
}

export function DropdownInput({
  name,
  label,
  value,
  options,
  placeholder = 'Select...',
  required,
  disabled = false
}: DropdownInputProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const hasError = !!errors[name];

  return (
    <div className='space-y-1.5'>
      <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label} is required` : false }}
        render={({ field }) => (
          <Select
            value={field.value ?? value ?? ''}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={cn(
                // base
                '!h-9 !w-full !rounded-md !border !px-3.5 !py-2.5 !text-sm !transition-all !duration-200',
                // '!border-gray-200 shadow-sm',
                // hover + focus
                // 'hover:!border-gray-300 hover:shadow',
                // 'ring-offset-white focus:!ring-3 focus:!ring-gray-300 focus:!outline-none',
                // dark
                // 'dark:!border-gray-700 dark:!bg-gray-900 dark:!text-gray-100 dark:ring-offset-gray-950 dark:hover:!border-gray-600 dark:focus:!ring-blue-600',
                // error
                hasError && '!border-red-500 focus:!ring-red-500'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent
              className={cn('z-50')}
              position='popper'
              sideOffset={6}
            >
              {options.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className={cn('text-sm')}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {hasError && (
        <p className='text-xs text-red-600 dark:text-red-500'>
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
