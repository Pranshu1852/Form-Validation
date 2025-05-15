import { useRef, type FormEvent } from 'react';
import InputField, { type InputRef } from './components/InputField';
import RadioGroupField from './components/RadioGroupField';
import TextAreaField from './components/TextAreaField';

function App() {
  // const [formData, setFormData] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  //   description: '',
  // });

  // const [submit, setSubmit] = useState(false);
  const formRefs = useRef<Record<string, InputRef | null>>({});

  const registerRef = (name: string) => (element: InputRef | null) => {
    formRefs.current[name] = element;
  };

  // function handleChange(event: ChangeEvent<HTMLInputElement>): void;
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  // function handleChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   setFormData((prevData) => {
  //     return {
  //       ...prevData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    let isValid = true;
    for (const key of Object.keys(formRefs.current)) {
      if (formRefs.current[key]?.validation().isError) {
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    console.log(formRefs.current);

    console.log('Form Submitted');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 m-auto w-[50%] mt-20"
    >
      <InputField
        ref={registerRef('username')}
        label="Username"
        id="username"
        name="username"
        placeholder="Enter your username..."
        rules={{
          minLength: {
            value: 5,
            message: 'Minimum length should be 5.',
          },
        }}
        validationMode="all"
      />
      <InputField
        ref={registerRef('email')}
        label="Email"
        id="email"
        name="email"
        placeholder="Enter your email..."
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter valid email',
          },
        }}
        validationMode="onChange"
      />
      <InputField
        ref={registerRef('password')}
        label="Password"
        id="password"
        name="password"
        placeholder="Enter your password..."
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          minLength: {
            value: 8,
            message: 'Password length should be atleast 8.',
          },
        }}
        validationMode="onBlur"
      />
      <RadioGroupField
        label="Priority"
        id="priority"
        name="priority"
        ref={registerRef('priority')}
        validationMode="all"
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
        }}
        options={[
          {
            label: 'High',
            value: 'high',
          },
          {
            label: 'Medium',
            value: 'medium',
          },
          {
            label: 'Low',
            value: 'low',
          },
        ]}
      />
      <TextAreaField
        ref={registerRef('password')}
        label="Password"
        id="password"
        name="password"
        placeholder="Enter your password..."
        rules={{
          required: {
            value: true,
            message: 'This field is required.',
          },
          minLength: {
            value: 8,
            message: 'Password length should be atleast 8.',
          },
        }}
        validationMode="onBlur"
      />
      <button
        type="submit"
        className="bg-black px-4 py-2 rounded-lg text-white"
      >
        Submit
      </button>
    </form>
  );
}

export default App;
