'use client';

import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InputProps } from '../types';

export function TextInput({
  name,
  label,
  defaultValue = '',
  type = 'text',
  placeholder,
  required,
  disabled = false
}: InputProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className='space-y-1'>
      <Label
        htmlFor={name}
        className='mb-1 text-sm font-medium text-gray-900 dark:text-gray-100'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={cn(hasError && 'border-red-500')}
        {...register(name, {
          required: required ? `${label} is required` : false
        })}
      />
      {hasError && (
        <p className='text-xs text-red-500'>{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
