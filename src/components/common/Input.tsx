import React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  error?: string;
  inputClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function _Input(
    {
      children,
      rightIcon,
      leftIcon,
      className = '',
      inputClassName = '',
      onChange,
      error,
      ...props
    },
    ref
  ) {
    return (
      <div className={cn('w-full flex items-center py-2 gap-4', className)}>
        {children}
        <div className="relative w-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2 border-2 px-3 py-1 sm:px-[14px] sm:py-2 border-lightGray rounded-lg hover:border-darkGray focus-within:border-primary-600 focus-within:border-2">
              {leftIcon}
              <input
                className={cn(
                  'w-full border-0 p-0 focus:ring-0 text-black text-sm sm:text-base bg-transparent outline-none focus:outline-none focus:shadow-none placeholder:text-lightGray tracking-wider placeholder:text-xs placeholder:sm:text-sm',
                  inputClassName
                )}
                ref={ref}
                onChange={onChange}
                {...props}
              />
              {rightIcon}
            </div>
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
          </div>
        </div>
      </div>
    );
  }
);
