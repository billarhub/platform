import { RadioGroup } from '@headlessui/react';
import { FieldError } from 'react-hook-form';
import CircleIcon from '../icon/CircleIcon';

export default function CommonRadioGroup({
  label,
  value = '',
  onChange,
  options,
  onBlur,
  error,
}: {
  label: string;
  value: string | number;
  onChange: any;
  onBlur: any;
  options: {
    id: number | string;
    value: any;
    label: string;
  }[];
  error: FieldError | undefined;
}) {
  return (
    <>
      <RadioGroup value={value} onChange={onChange} onBlur={onBlur}>
        <RadioGroup.Label className="text-black font-bold text-lg uppercase">
          {label}
        </RadioGroup.Label>
        <div className="flex justify-start items-center gap-5 pt-4">
          {options.map((option) => (
            <RadioGroup.Option key={option.id} value={option.value}>
              {({ checked }) => (
                <div className="flex flex-row justify-center items-center">
                  <div
                    className={`flex items-center justify-center h-6 w-6 bg-lightGray-300 rounded-full`}
                  >
                    {checked && <CircleIcon className="w-3 h-3" />}
                  </div>
                  <span className="ml-2 text-gray-700 uppercase">{option.label}</span>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </>
  );
}
