import { cn } from '@/lib/cn';
import React from 'react';

interface InputSubtitleProps {
  children: React.ReactNode;
  subtitleClassName?: string;
  className?: string;
  subtitle?: string;
}

function InputSubtitle({
  children,
  subtitleClassName,
  className,
  subtitle,
}: InputSubtitleProps): JSX.Element {
  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      <h1
        className={cn(
          'text-black font-bold text-lg uppercase',
          subtitleClassName
        )}
      >
        {subtitle}
      </h1>
      {children}
    </div>
  );
}

export default InputSubtitle;
