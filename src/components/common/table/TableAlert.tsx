import React from 'react';
import InformationIcon from '@/components/icon/InformationIcon';


interface TableAlertProps {
  title: string;
  text: string;
  className?: string;
  show: boolean;
  titleClassName?: string;
  textClassName?: string;
}

function TableAlert({
  title,
  text,
  show = false,
  className = '',
  titleClassName = '',
  textClassName = '',
}: TableAlertProps) {
  return (
    <div>
      {show ? (
        <div
          className={`bg-primary-50/25 rounded-b text-teal-900 px-4 py-3 shadow-[0_4px_10px_rgba(0,0,0,0.1)] ${className}`}
          role="alert"
        >
          <div className="flex flex-row gap-2">
            <div className="py-1">
              <InformationIcon className="w-5 h-5 text-text-dark" />
            </div>
            <div>
              <p className={`font-bold text-text-dark ${titleClassName}`}>
                {title}
              </p>
              <p className={`text-sm text-text-darkGray ${textClassName}`}>
                {text}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TableAlert;