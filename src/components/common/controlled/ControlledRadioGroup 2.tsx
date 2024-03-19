import React from 'react';
import CommonRadioGroup from '../CommonRadioGroup';
import { Control, Controller, FieldError } from 'react-hook-form';

interface Option {
  id: number;
  value: any;
  label: string;
}

interface ControlledRadioGroupProps {
  control: Control<any, any>;
  error: FieldError | undefined;
  name: string;
  label: string;
  options: Option[];
}

function ControlledRadioGroup({
  control,
  error,
  name,
  label,
  options,
}: ControlledRadioGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, onBlur } }) => (
        <CommonRadioGroup
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          error={error}
        />
      )}
    />
  );
}

export default ControlledRadioGroup;
