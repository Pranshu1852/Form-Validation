import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type RefObject,
} from 'react';
import { ErrorCheck } from '../utils/validation';

interface Rules {
  value: boolean | number | string | RegExp;
  message: string;
}

type FormFieldProps = {
  label?: string;
  id: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: FocusEvent<HTMLInputElement>) => void;
  rules?: Record<string, Rules>;
  error?: RefObject<string>;
  validationMode: 'onChange' | 'onBlur' | 'all';
  submit: boolean;
} & React.HTMLProps<HTMLInputElement>;

function FormField({
  label,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  rules,
  error,
  submit,
  validationMode,
  ...props
}: FormFieldProps) {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (submit && rules && !isFocus) {
      CheckError(value);
    }
  }, [submit]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    if (
      validationMode &&
      (validationMode === 'all' || validationMode === 'onChange')
    ) {
      CheckError(inputValue);
    }
    onChange(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    setIsFocus(true);

    if (
      validationMode &&
      (validationMode === 'all' || validationMode === 'onBlur')
    ) {
      CheckError(event.target.value);
    }

    if (onBlur) {
      onBlur(event);
    }
  }

  function CheckError(inputVal: string) {
    if (rules) {
      error!.current = (function isError(): string {
        for (const rule of Object.keys(rules)) {
          if (ErrorCheck(rule, rules[rule].value, inputVal)) {
            return rules[rule].message;
          }
        }
        return '';
      })();
    }
  }

  return (
    <div className="flex flex-col gap-2 self-start w-full">
      {label && (
        <label className="text-lg font-medium" htmlFor={id}>
          {label}
          {rules && rules.required && rules.required.value && (
            <span className="text-red-600"> *</span>
          )}
        </label>
      )}
      <input
        className="border-[1.5px] border-black rounded-md p-2"
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...props}
      />
      {error?.current !== '' && (
        <p className="text-red-600 font-medium text-sm">{error?.current}</p>
      )}
    </div>
  );
}

export default FormField;
