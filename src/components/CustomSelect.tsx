import {
  useImperativeHandle,
  useState,
  type MouseEvent,
  type UIEvent,
} from 'react';
import { ErrorCheck } from '../utils/validation';
import type { InputRef } from './InputField';

interface Rules {
  value: boolean | number | string | RegExp;
  message: string;
}

interface Option {
  label: string;
  value: string;
}

type InfiniteSelectProps = {
  label: string;
  id: string;
  options: Array<Option>;
  rules?: Record<string, Rules>;
  validationMode: 'onChange' | 'onBlur' | 'all';
  ref: (element: InputRef | null) => void;
  onChange?: (event: MouseEvent<HTMLButtonElement>) => void;
  onLoadMore: () => void;
};

function InfiniteSelect({
  label,
  id,
  options,
  onChange,
  rules,
  validationMode,
  onLoadMore,
  ref,
}: InfiniteSelectProps) {
  const [value, setValue] = useState('');
  const [placeHolder, setPlaceHolder] = useState(label);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const throttleLoad = throttle(onLoadMore, 1000);

  useImperativeHandle(ref, () => {
    return {
      validation: () => {
        const errormessage = CheckError(value);
        return {
          error: errormessage,
          isError: errormessage !== '',
        };
      },
      value,
    };
  });

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    const inputValue = event.currentTarget.value;
    setPlaceHolder(event.currentTarget.innerText);
    setIsOpen(false);
    setValue(inputValue);
    if (
      validationMode &&
      (validationMode === 'all' || validationMode === 'onChange')
    ) {
      CheckError(inputValue);
    }

    if (onChange) {
      onChange(event);
    }
  }

  function CheckError(inputVal: string) {
    if (rules) {
      const errorMessage = (function isError(): string {
        for (const rule of Object.keys(rules)) {
          if (ErrorCheck(rule, rules[rule].value, inputVal)) {
            return rules[rule].message;
          }
        }
        return '';
      })();
      setError(errorMessage);
      return errorMessage;
    }
    return '';
  }

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    if (
      event.currentTarget.clientHeight + event.currentTarget.scrollTop >=
      event.currentTarget.scrollHeight - 50
    ) {
      throttleLoad();
    }
  }

  return (
    <div className="flex flex-col gap-2 self-start w-full">
      <div className="relative">
        <button
          onClick={toggleOpen}
          type="button"
          className="flex flex-row gap-5 justify-between items-center p-2 border-[1px] border-black rounded-md"
        >
          {placeHolder}
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
        {isOpen && (
          <div
            onScroll={handleScroll}
            className="absolute top-12 z-50 border-[1px] border-black bg-white text-black p-4 rounded-md max-h-[150px] overflow-auto"
            id={id}
          >
            <ul className="w-full">
              {options.map((element) => {
                return (
                  <li
                    key={element.label + element.value}
                    className={`${element.value === value && 'bg-slate-200'} w-full py-2 px-4 rounded-md`}
                  >
                    <button
                      type="button"
                      onClick={handleClick}
                      value={element.value}
                    >
                      {element.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {error !== '' && (
        <p className="text-red-600 font-medium text-sm">{error}</p>
      )}
    </div>
  );
}

function throttle(func: Function, duration: number) {
  let flag = true;

  return function (...args: unknown[]) {
    if (flag) {
      func(...args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, duration);
    }
  };
}

export default InfiniteSelect;
