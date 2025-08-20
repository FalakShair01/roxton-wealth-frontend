'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { InputProps } from '../types';

interface RadioInputProps extends InputProps {
  options: { label: string; value: string }[];
}

export function RadioInput({
  name,
  label,
  options,
  required,
  disabled = false
}: RadioInputProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className='space-y-1.5'>
      <Label className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      <div className={['flex flex-wrap gap-3', hasError ? '' : ''].join(' ')}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={[
              // pill/card look
              'inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm',
              'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
              'transition-colors duration-200',
              // dark mode
              'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:hover:border-gray-600',
              // error highlight (subtle red border)
              hasError ? 'border-red-300 dark:border-red-500/60' : ''
            ].join(' ')}
          >
            <input
              type='radio'
              value={opt.value}
              disabled={disabled}
              {...register(name, {
                required: required ? `${label} is required` : false
              })}
              className={[
                'mr-2 h-4 w-4',
                // prettier radios (Tailwind v3 accent-color)
                'accent-blue-600 dark:accent-blue-500',
                // focus ring for accessibility
                'focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none',
                'dark:focus:ring-blue-600 dark:focus:ring-offset-gray-950'
              ].join(' ')}
            />
            <span className='text-gray-800 dark:text-gray-200'>
              {opt.label}
            </span>
          </label>
        ))}
      </div>

      {hasError && (
        <p className='text-xs text-red-600 dark:text-red-500'>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
