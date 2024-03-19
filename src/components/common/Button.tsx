import { cn } from '@/lib/cn';
import React from 'react';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  outlined?: boolean;
}

export default function Button({
  className,
  children,
  fullWidth = false,
  outlined = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'py-2 px-4 rounded font-semibold tracking-wide uppercase',
        {
          'border border-primary-600 text-primary-600 bg-white': outlined,
          'bg-primary-600 text-white hover:bg-primary-600/80 duration-150 ease-in-out focus:bg-primary-400':
            !outlined,
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
