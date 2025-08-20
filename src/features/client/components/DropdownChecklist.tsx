'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';

// If you use shadcn/ui:
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

type Option = { label: string; value: string };

interface DropdownChecklistProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string; // not required, we show "n/total Selected"
  required?: boolean;
  disabled?: boolean;
}

export function DropdownChecklist({
  name,
  label,
  options,
  placeholder,
  required,
  disabled
}: DropdownChecklistProps) {
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
        rules={{
          required: required ? `${label} is required` : false
        }}
        render={({ field }) => {
          // RHF stores value; ensure it's an array.
          const selected: string[] = Array.isArray(field.value)
            ? field.value
            : [];

          const total = options.length;
          const count = selected.length;

          // Build trigger label
          const triggerText =
            count === 0
              ? (placeholder ?? `0/${total} Selected`)
              : `${count}/${total} Selected`;

          const isChecked = (val: string) => selected.includes(val);

          const toggle = (val: string) => {
            if (isChecked(val)) {
              field.onChange(selected.filter((v) => v !== val));
            } else {
              field.onChange([...selected, val]);
            }
          };

          const clearAll = () => field.onChange([]);
          const selectAll = () => field.onChange(options.map((o) => o.value));

          return (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type='button'
                  disabled={disabled}
                  className={cn(
                    'flex h-9 w-full items-center justify-between rounded-md border px-3.5 text-sm transition-all duration-200',
                    // 'bg-white text-gray-900',
                    hasError ? 'border-red-500' : 'border-gray-700',
                    // 'focus:outline-none focus:ring-3 focus:ring-gray-300 ring-offset-2 ring-offset-white',
                    'disabled:cursor-not-allowed disabled:opacity-60'
                  )}
                >
                  <span className={cn(count === 0 && 'text-gray-400')}>
                    {triggerText}
                  </span>
                  <ChevronDown className='h-4 w-4 text-gray-500' />
                </button>
              </PopoverTrigger>

              <PopoverContent
                sideOffset={6}
                className='z-50 w-[--radix-popover-trigger-width] rounded-xl border border-gray-200 p-0 shadow-xl dark:border-gray-700 dark:bg-gray-900'
              >
                <Command>
                  <div className='flex items-center justify-between px-2 py-2'>
                    <div className='text-xs text-gray-500'>
                      {count}/{total} selected
                    </div>
                    <div className='space-x-1'>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={selectAll}
                      >
                        Select All
                      </Button>
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        onClick={clearAll}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>

                  <CommandList className='max-h-56'>
                    <CommandEmpty className='px-3 py-2 text-sm text-gray-500'>
                      No options
                    </CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => {
                        const checked = isChecked(opt.value);
                        return (
                          <CommandItem
                            key={opt.value}
                            className={cn(
                              'cursor-pointer rounded-md px-3 py-2 text-sm select-none',
                              'aria-selected:bg-gray-50'
                            )}
                            onSelect={() => toggle(opt.value)}
                          >
                            <span className='border-primary mr-2 flex h-4.5 w-4.5 items-center justify-center rounded-[4px] border'>
                              {checked && (
                                <Check className='text-primary h-3.5 w-3.5' />
                              )}
                            </span>
                            <span>{opt.label}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>

                  {/* {count > 0 && (
                    <div className="flex flex-wrap gap-1 border-t border-gray-100 p-2">
                      {selected
                        .slice(0, 3)
                        .map((val) => options.find((o) => o.value === val)?.label || val)
                        .map((labelText, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                          >
                            {labelText}
                          </span>
                        ))}
                      {count > 3 && (
                        <span className="text-xs text-gray-500">
                          +{count - 3} more
                        </span>
                      )}
                    </div>
                  )} */}
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {hasError && (
        <p className='text-xs text-red-600 dark:text-red-500'>
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
