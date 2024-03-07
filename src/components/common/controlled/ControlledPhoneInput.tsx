import { Controller } from 'react-hook-form';
import type { Control } from 'react-hook-form';
import { PhoneInputModel, PhoneInputProps } from '../PhoneInput';

interface ControlledPhoneInputProps extends PhoneInputProps {
  control: Control<any, any>;
  name: string;
  value?: string;
  label?: string;
  onChange?: (phone: string) => void;
  disabled?: boolean;
  error?: string;
  labelClassName?: string;
  inputKey: number;
}

const ControlledPhoneInput: React.FC<ControlledPhoneInputProps> = ({
  control,
  name,
  label,
  disabled,
  error,
  labelClassName,
  inputKey,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: _onChange, value: _value } }) => (
        <PhoneInputModel
          inputKey={inputKey}
          value={_value}
          label={label}
          onChange={_onChange}
          disabled={disabled}
          error={error}
          labelClassName={labelClassName}
        />
      )}
    />
  );
};

export default ControlledPhoneInput;
