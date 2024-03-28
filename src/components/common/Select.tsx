import React from 'react';
import { cn } from '@/lib/cn';
import { OptionType } from '@/models';

export interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options: OptionType[];
  error?: string;
  selectClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function _Select(
    {
      options,
      className = '',
      selectClassName = '',
      onChange,
      error,
      ...props
    },
    ref
  ) {
    return (
      <div className={cn('w-full flex items-center py-2 gap-4', className)}>
        <div className="relative w-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 border-2 px-3 py-1 sm:px-[14px] sm:py-2 border-lightGray-300 rounded-lg hover:border-darkGray focus-within:border-primary-600 focus-within:border-2">
              <select
                className={cn(
                  'w-full border-0 p-0 focus:ring-0 text-black text-sm sm:text-base bg-transparent outline-none focus:outline-none focus:shadow-none placeholder:text-lightGray-600 tracking-wider placeholder:text-xs placeholder:sm:text-sm',
                  selectClassName
                )}
                ref={ref}
                onChange={onChange}
                {...props}
              >
                {options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);
