'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FileInputProps {
  name: string;
  label: string;
  required?: boolean;
  maxSizeMB?: number; // default 10
}

export function FileInput({
  name,
  label,
  required,
  maxSizeMB = 10
}: FileInputProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();

  const file: File | undefined = watch(name) as any;
  const [dragActive, setDragActive] = useState(false);
  const hasError = !!errors[name];

  // helpers
  const toMB = (n: number) => (n / (1024 * 1024)).toFixed(2);

  // RHF register with custom validation (PDF only)
  const { ref, onChange, ...rest } = register(name, {
    required: required ? `${label} is required` : false,
    validate: {
      isPdf: (v: FileList | File | null) => {
        const f = (v as any)?.[0] ?? v;
        if (!f) return true; // required rule handles empties
        return f.type === 'application/pdf' || 'Only PDF files are allowed';
      },
      size: (v: FileList | File | null) => {
        const f = (v as any)?.[0] ?? v;
        if (!f) return true;
        return f.size <= maxSizeMB * 1024 * 1024 || `Max size ${maxSizeMB}MB`;
      }
    }
  });

  const handleFiles = (files?: FileList | null) => {
    const f = files?.[0];
    if (!f) return;
    // Set directly into RHF state so validation runs
    setValue(name, f as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const clearFile = () => {
    setValue(name, null as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
  };

  return (
    <div className='space-y-2'>
      <Label
        htmlFor={name}
        className='text-sm font-medium text-gray-900 dark:text-gray-100'
      >
        {label} {required && <span className='text-red-500'>*</span>}
      </Label>

      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={cn(
          'group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all',
          'bg-white/90 shadow-sm ring-offset-white hover:shadow-md',
          'dark:bg-gray-900 dark:ring-offset-gray-950',
          dragActive
            ? 'border-blue-500/70 bg-blue-50/40 dark:bg-blue-900/10'
            : hasError
              ? 'border-red-400/80'
              : 'border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600'
        )}
        onClick={() => document.getElementById(`${name}-input`)?.click()}
        aria-invalid={hasError ? 'true' : 'false'}
      >
        {/* Icon */}
        <svg
          className={cn(
            'mb-3 h-10 w-10 transition-colors',
            dragActive
              ? 'text-blue-500'
              : 'text-gray-400 group-hover:text-gray-500'
          )}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='1.8'
        >
          <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
          <path d='M14 2v6h6' />
          <path d='M9 13h6M9 17h6' />
        </svg>

        {/* Text */}
        <div className='space-y-1'>
          <p className='text-sm font-medium text-gray-800 dark:text-gray-100'>
            Click to upload <span className='text-blue-600'>PDF</span>
          </p>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            or drag &amp; drop — PDF only, up to {maxSizeMB}MB
          </p>
        </div>

        {/* Hidden native input */}
        <input
          id={`${name}-input`}
          type='file'
          accept='application/pdf'
          className='sr-only'
          ref={ref}
          onChange={(e) => {
            onChange(e); // keep RHF in sync
            handleFiles(e.target.files);
          }}
          {...rest}
        />
      </div>

      {/* Selected file chip */}
      {file && (
        <div className='flex items-center justify-between rounded-xl border bg-gray-50 px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-800/50'>
          <div className='flex min-w-0 items-center gap-2'>
            <span className='inline-flex h-6 w-6 items-center justify-center rounded-md bg-red-100 text-red-600 dark:bg-red-900/30'>
              PDF
            </span>
            <span className='truncate text-gray-800 dark:text-gray-100'>
              {file.name}
            </span>
            <span className='shrink-0 text-xs text-gray-500 dark:text-gray-400'>
              ({toMB(file.size)} MB)
            </span>
          </div>
          <button
            type='button'
            onClick={clearFile}
            className='ml-3 rounded-lg px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          >
            Remove
          </button>
        </div>
      )}

      {/* Helper / error */}
      {hasError && (
        <p className='text-xs text-red-600 dark:text-red-500'>
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
