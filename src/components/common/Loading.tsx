import React from 'react';
import SpinnerIcon from '../icon/SpinnerIcon';

interface LoadingProps {
  isFixed?: boolean;
}

function Loading({ isFixed = true }: LoadingProps) {
  return (
    <div className="h-full w-full flex justify-center">
      <div
        className={`flex opacity-70 z-30 ${
          isFixed ? 'h-screen fixed pb-44' : ''
        }`}
      >
        <SpinnerIcon className="m-auto w-24 h-24 text-primary-500 animate-spin fill-primary-300" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
