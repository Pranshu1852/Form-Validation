import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import FormField from "./components/FormField";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [submit,setSubmit]=useState(false);

  const errorUserName = useRef("");
  const errorEmail = useRef("");
  const errorPassword = useRef("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault();
    setSubmit(true);

    setTimeout(()=>{
      if((errorEmail.current||errorPassword.current||errorUserName.current)){
        setSubmit(false);
      }

      if(!(errorEmail.current||errorPassword.current||errorUserName.current)){
        setSubmit(false);
        console.log("form submitted");
      }
    },100)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 m-auto w-[50%] mt-20">
      <FormField
        label="Username"
        id="username"
        name="username"
        placeholder="Enter your username..."
        onChange={handleChange}
        submit={submit}
        value={formData.username}
        rules={{
          required: {
            value: true,
            message: "This field is required."
          },
          minLength: {
            value: 5,
            message: "Minimum length should be 5."
          }
        }}
        error={errorUserName}
      />
      <FormField
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
            message: "This field is required."
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter valid email',
          },
        }}
        error={errorEmail}
      />
      <FormField
        label="Password"
        id="password"
        name="password"
        placeholder="Enter your password..."
        onChange={handleChange}
        submit={submit}
        value={formData.password}
        error={errorPassword}
      />
      <button type="submit" className="bg-black px-4 py-2 rounded-lg text-white">Submit</button>
    </form>
  );
}

export default App;
