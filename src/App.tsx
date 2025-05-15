import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import InputField from './components/InputField';
import TextAreaField from './components/TextAreaField';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    description: '',
  });

  const [submit, setSubmit] = useState(false);

  const errorUserName = useRef('');
  const errorEmail = useRef('');
  const errorPassword = useRef('');
  const errorDescription = useRef('');

  function handleChange(event: ChangeEvent<HTMLInputElement>): void;
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void;
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmit(true);

    setTimeout(() => {
      if (
        errorEmail.current ||
        errorPassword.current ||
        errorUserName.current ||
        errorDescription
      ) {
        setSubmit(false);
      }

      if (
        !(errorEmail.current || errorPassword.current || errorUserName.current || errorDescription)
      ) {
        setSubmit(false);
        console.log('form submitted');
      }
    }, 100);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 m-auto w-[50%] mt-20"
    >
      <InputField
        label="Username"
        id="username"
        name="username"
        placeholder="Enter your username..."
        onChange={handleChange}
        submit={submit}
        value={formData.username}
        rules={{
          minLength: {
            value: 5,
            message: 'Minimum length should be 5.',
          },
        }}
        error={errorUserName}
        validationMode="all"
      />
      <InputField
        label="Email"
        id="email"
        name="email"
        placeholder="Enter your email..."
        onChange={handleChange}
        submit={submit}
        value={formData.email}
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
        error={errorEmail}
        validationMode="onChange"
      />
      <InputField
        label="Password"
        id="password"
        name="password"
        placeholder="Enter your password..."
        onChange={handleChange}
        submit={submit}
        value={formData.password}
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
        error={errorPassword}
        validationMode="onBlur"
      />
      <TextAreaField
        id="description"
        name="description"
        placeholder="Enter some description"
        value={formData.description}
        onChange={handleChange}
        rules={{
          required: {
            value: true,
            message: 'This field is required.'
          },
          minLength: {
            value: 10,
            message: "Minimum length should be 10."
          },
          maxLength: {
            value: 20,
            message: "Maximum length should be 20."
          }
        }}
        validationMode="all"
        submit={submit}
        error={errorDescription}
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
