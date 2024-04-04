import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export interface PhoneInputProps {
  blueBg?: boolean;
  labelClassName?: string;
  countryCode?: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (...event: any[]) => void; // Es el type definido en RHF para el onChange https://www.react-hook-form.com/api/usecontroller/controller/
  error?: string;
  inputKey: number;
}

export function PhoneInputModel({
  labelClassName,
  label,
  disabled,
  countryCode = 've',
  value,
  onChange,
  error,
  inputKey,
}: PhoneInputProps) {
  const [windowSize, setWindowSize] = React.useState(getWindowSize());
  const [focus, setFocus] = React.useState(false);

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <label className={`block min-h-[50px] md:min-h-[100px] ${labelClassName}`}>
      <div className="w-full flex items-center py-2 gap-4">
        <div className="relative w-full">
          <PhoneInput
            // enableSearch
            key={inputKey}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disableDropdown
            disabled={disabled}
            inputClass=".phone-input-container"
            placeholder="Ingrese un número de teléfono"
            value={value}
            onChange={onChange}
            country={countryCode}
            onlyCountries={[countryCode]}
            masks={{ ve: '(...)-.......' }}
            containerClass="phone-input-container"
            containerStyle={{
              border: focus ? '2px solid #F26223' : '2px solid #D9D9D9',
              borderRadius: '8px',
              padding: windowSize.innerWidth > 640 ? 6 : 1,
            }}
            inputStyle={{
              width: '100%',
              border: 'none',
              color: '#000000',
              letterSpacing: '0.05em',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: windowSize.innerWidth > 640 ? 16 : 14,
              lineHeight: windowSize.innerWidth > 640 ? '24px' : '20px',
              outline: 'none',
            }}
            buttonStyle={{
              border: 'none',
              backgroundColor: 'transparent',
              borderRadius: '8px',
              fontFamily: 'Roboto',
              fontSize: windowSize.innerWidth > 640 ? 16 : 14,
              lineHeight: windowSize.innerWidth > 640 ? '24px' : '20px',
              outline: 'none',
            }}
            countryCodeEditable={false}
            searchPlaceholder="Buscar"
          />
        </div>
      </div>
      {error ? <p className="text-xs text-red-600 mb-3">{error}</p> : null}
    </label>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
