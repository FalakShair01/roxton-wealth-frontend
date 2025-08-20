'use client';

import { IconCheck, IconLock } from '@tabler/icons-react';
import {
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GenerateStepsFromFormData } from '../utils/generateStepsFromFormData';

// Tailwind‑friendly classnames helper
export function cn(...inputs: ClassValue[]) {
  // either of these works; the spread is the common form
  return twMerge(clsx(...inputs));
  // return twMerge(clsx(inputs)) // also valid, since clsx accepts arrays
}
const steps = GenerateStepsFromFormData();

export default function InstagramCourseProgress({
  step,
  subStep
}: {
  step: number;
  subStep: number;
}) {
  const [openIndexes, setOpenIndexes] = useState<number>();
  const completedCount = step;
  const totalSteps = steps.length;

  const toggleStep = (index: number) => {
    // setOpenIndexes((prev) =>
    //   prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    // );
    setOpenIndexes((prev) => (prev === index ? undefined : index));
  };

  return (
    <div className='max-w-md rounded-xl border p-6 shadow-md'>
      {/* Header */}
      <div className='mb-4'>
        <h2 className='text-lg font-semibold'>
          Mortgage & Protection Fact Find
        </h2>
        <p className='mt-1 text-sm text-gray-500'>{`${completedCount}/${totalSteps} COMPLETED`}</p>

        {/* Progress bar */}
        <div className='mt-3 flex items-center gap-1'>
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={cn(
                'h-2 flex-1 rounded-full',
                idx < completedCount ? 'bg-primary' : 'bg-primary/20'
              )}
            />
          ))}
        </div>
      </div>

      {/* Step list */}
      <div
        className='scrollbar-premium mt-6 space-y-4 overflow-y-auto pr-2 pb-8'
        style={{
          maxHeight: 'calc(100vh - var(--header-h) - 160px)' // header height + card header space
        }}
      >
        {steps.map((stepItem, idx) => {
          // const isOpen = openIndexes.includes(idx);
          const isOpen = openIndexes === idx;
          const isCompleted = idx < step;
          const isCurrent = idx === step;
          const isLocked = idx > step;

          return (
            <div key={idx}>
              <div
                className='flex cursor-pointer items-center justify-between'
                onClick={() => toggleStep(idx)}
              >
                {/* Left: Number + Title (title gets max width & truncates) */}
                <div className='flex min-w-0 items-center gap-3'>
                  {/* Fixed round number */}
                  <div
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs leading-none font-bold transition-colors',
                      isCompleted &&
                        'bg-primary text-primary-foreground border-primary',
                      isCurrent && 'text-primary border-primary bg-transparent',
                      isLocked && 'border-gray-300 text-gray-400'
                    )}
                  >
                    {idx + 1}
                  </div>

                  {/* Label with max width */}
                  <span
                    className={cn(
                      'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
                      isCompleted && 'text-gray-500 line-through',
                      isCurrent && 'text-primary',
                      isLocked && 'text-gray-400'
                    )}
                    title={stepItem.title} /* tooltip for full text */
                  >
                    {stepItem.title}
                  </span>
                </div>

                {/* Right: status icon (lock/check) in a fixed slot, then chevron */}
                <div className='ml-3 flex items-center gap-2'>
                  {isLocked ? (
                    <IconLock className='h-4 w-4 shrink-0 text-gray-400' />
                  ) : isCompleted ? (
                    <IconCheck className='text-primary h-4 w-4 shrink-0' />
                  ) : (
                    <span className='h-4 w-4 shrink-0' />
                  )}

                  {isOpen ? (
                    <ChevronDownIcon className='h-4 w-4 shrink-0 text-gray-400' />
                  ) : (
                    <ChevronRightIcon className='h-4 w-4 shrink-0 text-gray-400' />
                  )}
                </div>
              </div>

              {/* Subtitles */}
              {isOpen &&
                stepItem?.subTitles &&
                stepItem?.subTitles?.length > 0 && (
                  <ul className='mt-2 ml-11 space-y-1 text-sm text-gray-500'>
                    {stepItem.subTitles.map((sub, subIdx) => {
                      const isSubCompleted =
                        idx < step || // all substeps of *previous* steps are completed
                        (idx === step && subIdx < subStep); // only earlier substeps in current step are completed
                      const isSubCurrent = idx === step && subIdx === subStep;

                      const isSubLocked =
                        idx > step || (idx === step && subIdx > subStep);

                      return (
                        <li key={subIdx} className='flex'>
                          <span
                            className={cn(
                              'mr-2 text-gray-400',
                              isSubCompleted && 'text-primary border-primary',
                              isSubCurrent &&
                                'text-primary border-primary bg-transparent',
                              isSubLocked && 'border-gray-300 text-gray-400'
                            )}
                          >
                            {String.fromCharCode(97 + subIdx)}.
                          </span>
                          <span
                            className={cn(
                              'block min-w-0 flex-1 truncate text-sm font-medium transition-colors',
                              isSubCompleted && 'text-gray-500 line-through',
                              isSubCurrent && 'text-primary',
                              isSubLocked && 'text-gray-400'
                            )}
                          >
                            {sub}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
