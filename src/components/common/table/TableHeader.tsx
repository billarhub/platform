import React from 'react';

export default function TableHeader({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={`p-6 w-full flex flex-col md:flex-row justify-between gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
