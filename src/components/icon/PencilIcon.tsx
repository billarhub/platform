import React from 'react';

function PencilIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M28.1611 1.14913C26.7383 -0.273667 24.4315 -0.273667 23.0087 1.14913L21.4027 2.75516L26.5551 7.90755L28.1611 6.30151C29.5839 4.87872 29.5839 2.57192 28.1611 1.14913Z"
        fill="currentColor"
      />
      <path
        d="M25.083 9.37966L19.9306 4.22727L3.0662 21.0916C2.21014 21.9477 1.58088 23.0036 1.23526 24.1638L0.125226 27.8902C0.0161078 28.2565 0.11652 28.6532 0.386788 28.9234C0.657057 29.1937 1.05371 29.2941 1.42002 29.185L5.14643 28.075C6.30669 27.7293 7.36254 27.1001 8.2186 26.244L25.083 9.37966Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default PencilIcon;
