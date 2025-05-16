// import {
//   useImperativeHandle,
//   useState,
//   type ChangeEvent,
//   type FocusEvent,
// } from 'react';
// import { ErrorCheck } from '../utils/validation';
// import type { InputRef } from './InputField';

// interface Rules {
//   value: boolean | number | string | RegExp;
//   message: string;
// }

// interface Option {
//   label: string;
//   value: string;
// }

// type InfiniteSelectProps = {
//   label: string;
//   id: string;
//   name: string;
//   placeholder: string;
//   options: Array<Option>;
//   rules?: Record<string, Rules>;
//   validationMode: 'onChange' | 'onBlur' | 'all';
//   ref: (element: InputRef | null) => void;
//   onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
//   onBlur?: (value: FocusEvent<HTMLSelectElement>) => void;
// };

// function InfiniteSelect({
//   label,
//   id,
//   name,
//   placeholder,
//   options,
//   onChange,
//   onBlur,
//   rules,
//   validationMode,
//   ref,
// }: InfiniteSelectProps) {
//   const [value, setValue] = useState('');
//   const [error, setError] = useState('');

//   useImperativeHandle(ref, () => {
//     return {
//       validation: () => {
//         const errormessage = CheckError(value);
//         return {
//           error: errormessage,
//           isError: errormessage !== '',
//         };
//       },
//       value,
//     };
//   });

//   function handleChange(event: ChangeEvent<HTMLSelectElement>) {
//     const inputValue = event.target.value;
//     setValue(inputValue);
//     if (
//       validationMode &&
//       (validationMode === 'all' || validationMode === 'onChange')
//     ) {
//       CheckError(inputValue);
//     }

//     if (onChange) {
//       onChange(event);
//     }
//   }

//   function CheckError(inputVal: string) {
//     if (rules) {
//       const errorMessage = (function isError(): string {
//         for (const rule of Object.keys(rules)) {
//           if (ErrorCheck(rule, rules[rule].value, inputVal)) {
//             return rules[rule].message;
//           }
//         }
//         return '';
//       })();
//       setError(errorMessage);
//       return errorMessage;
//     }
//     return '';
//   }

//   return (
//     <div className="flex flex-col gap-2 self-start w-full">
//       {label && (
//         <label className="text-lg font-medium" htmlFor={id}>
//           {label}
//           {rules && rules.required && rules.required.value && (
//             <span className="text-red-600"> *</span>
//           )}
//         </label>
//       )}
//       <select name={name} id={id} value={value} onChange={handleChange} className='appearance-none bg-transparent p-2 border-[1px] border-black rounded-md'>
//         <option value="">{placeholder}</option>
//         {options.map((element) => {
//           return <option value={element.value}>{element.label}</option>;
//         })}
//       </select>
//       {error !== '' && (
//         <p className="text-red-600 font-medium text-sm">{error}</p>
//       )}
//     </div>
//   );
// }

// export default InfiniteSelect;
