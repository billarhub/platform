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
  fullWidth = true,
  outlined = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`py-2 px-4 rounded font-semibold tracking-wide uppercase ${
        outlined
          ? 'border border-primary-600 text-primary-600 bg-white'
          : 'bg-primary-600 text-white hover:bg-primary-600/80 duration-150 ease-in-out focus:bg-primary-400'
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
