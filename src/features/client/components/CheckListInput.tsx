'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { InputProps } from '../types';

interface CheckListInputProps extends InputProps {
  options: { label: string; value: string }[];
}

export function CheckListInput({
  name,
  label,
  options,
  required
}: CheckListInputProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];
  const errorId = `${name}-error`;

  return (
    <div className='space-y-1'>
      <Label
        htmlFor={name}
        className='text-sm font-medium text-gray-900 dark:text-gray-100'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <div
        className={cn('ml-1 flex flex-wrap gap-2', hasError && 'pt-0.5')}
        aria-describedby={hasError ? errorId : undefined}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm',
              'border-gray-200 bg-white transition-colors',
              'hover:border-gray-300 hover:shadow-sm',
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600'
            )}
          >
            <input
              type='checkbox'
              value={opt.value}
              className={cn(
                'h-4 w-4',
                'accent-blue-600 dark:accent-blue-500',
                'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none',
                'dark:focus:ring-blue-600 dark:focus:ring-offset-gray-950'
              )}
              {...register(name, {
                // At least one required?
                ...(required
                  ? {
                      validate: (vals: any) =>
                        (Array.isArray(vals) && vals.length > 0) ||
                        `${label} is required`
                    }
                  : {})
              })}
            />
            <span className='text-gray-800 dark:text-gray-200'>
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {hasError && (
        <p id={errorId} className='text-xs text-red-500'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
