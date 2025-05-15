import React, { useEffect, useState, type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import { ErrorCheck } from '../utils/validation';

interface Rules {
  value: boolean | number | string | RegExp;
  message: string;
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: string) => void;
  rules?: Record<string, Rules>;
  error?: RefObject<string>,
  submit: boolean
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
  ...props
}: FormFieldProps) {
    useEffect(()=>{
      if(submit&&rules){
        CheckError(value);
      }
    },[submit])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    CheckError(inputValue);
    onChange(event);
  }

  function CheckError(inputVal: string) {
    if (rules) {
      error!.current = (function isError(): string {
        for (let a of Object.keys(rules)) {
          if (ErrorCheck(a, rules[a].value, inputVal)) {
            return rules[a].message;
          }
        }
        return '';
      })();
    }
  }

  return (
    <div className="flex flex-col gap-2 self-start w-full">
      <label className="text-lg font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        className="border-[1.5px] border-black rounded-md p-2"
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {error?.current !== '' && (
        <p className="text-red-600 font-medium text-sm">{error?.current}</p>
      )}
    </div>
  );
}

export default FormField;

 