import { cn } from '@/lib/cn';
import React from 'react';

interface InputSubtitleProps {
  children: React.ReactNode;
  subtitleClassName?: string;
  className?: string;
  subtitle?: string;
  descriptionSubtitle?: string;
}

function InputSubtitle({
  children,
  subtitleClassName,
  className,
  subtitle,
  descriptionSubtitle,
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
        {' '}
        {descriptionSubtitle && (
          <span className="text-black font-normal text-xs uppercase">
            {descriptionSubtitle}
          </span>
        )}
      </h1>
      {children}
    </div>
  );
}

export default InputSubtitle;
