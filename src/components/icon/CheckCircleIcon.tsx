import React from 'react';

function CheckCircleIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.122925 14.0674C0.122925 6.59373 6.1815 0.535156 13.6551 0.535156C21.1288 0.535156 27.1873 6.59373 27.1873 14.0674C27.1873 21.541 21.1288 27.5996 13.6551 27.5996C6.1815 27.5996 0.122925 21.541 0.122925 14.0674ZM18.6659 11.5496C19.0001 11.0818 18.8917 10.4317 18.4239 10.0975C17.9561 9.76335 17.306 9.8717 16.9718 10.3395L12.4814 16.6262L10.2274 14.3722C9.82092 13.9657 9.16183 13.9657 8.75532 14.3722C8.34881 14.7788 8.34881 15.4378 8.75532 15.8444L11.8781 18.9672C12.0945 19.1835 12.3951 19.2937 12.7 19.2685C13.005 19.2433 13.2834 19.0851 13.4612 18.8362L18.6659 11.5496Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default CheckCircleIcon;
