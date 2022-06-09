import "../styles/register.css";
import { useState } from "react";
import FormInput from "./FormInput";
import apiUrl from "./API_URL";
import axios from "axios";
const Register = ({ setLogin }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 9,
      name: "firstName",
      type: "text",
      placeholder: "First name",
      errorMessage:
        "First name must not include any special characters or numbers",
      label: "First name",
      className: "first-name-input",
      pattern: /^[A-Za-z]{2,20}$/,
      required: true,
      badInput: false,
    },
    {
      id: 10,
      name: "lastName",
      type: "text",
      placeholder: "Last name",
      className: "last-name-input",
      errorMessage:
        "Last name must not include any special characters or numbers",
      label: "Last name",
      pattern: /^[A-Za-z]{2,20}$/,
      required: true,
      badInput: false,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Invalid email address",
      label: "Email",
      pattern: /\S+@\S+\.\S+/,
      required: true,
      badInput: false,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      required: true,
      badInput: false,
    },
    /*     {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords must match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    }, */
  ]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const register = async () => {
    try {
      await axios.post(
        `${apiUrl}/auth/register`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          email: values.email,
        },
        { withCredentials: true }
      );

      //triggerToast(true, "Account succesfully registered!");
      setLogin(true);
    } catch (error) {
      //triggerToast(false, error.response.data.message);
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(values);
    inputs.forEach((input, index) => {
      let error = false;
      if (input.name === "confirmPassword") {
        if (values["password"] !== values[input.name]) error = true;
      } else if (!input.pattern.test(values[input.name])) error = true;

      const newInputs = inputs;
      if (error) {
        newInputs[index].badInput = true;
      } else {
        if (input.badInput) {
          newInputs[index].badInput = false;
        }
      }
      setInputs([...newInputs]);
    });

    const error = inputs.find((i) => i.badInput === true);
    !error && register();
  };

  return (
    <div className="register-container">
      <h2 className="register-text">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {inputs.map((input) => (
          <FormInput {...input} onChange={onChange} key={input.id} />
        ))}
        {/* <div className="two-inputs">
          <label>
            First name:
            <input
              type="text"
              placeholder="First name"
              className="text-input full-name-input"
            />
          </label>
          <label>
            Last name:
            <input
              type="text"
              placeholder="Last name"
              className="text-input full-name-input"
            />
          </label>
        </div>
        <div className="two-inputs">
          <label>
            Handle:
            <input
              type="text"
              placeholder="@Handle"
              className="text-input full-name-input"
            />
          </label>
          <label>
            Country:
            <input
              type="select"
              placeholder="Country"
              className="text-input full-name-input"
            />
          </label>
        </div>

        <label>
          E-mail:
          <input type="email" placeholder="E-mail" className="email-input" />
        </label>

        <label>
          Password:
          <input
            type="password"
            placeholder="Password"
            className="password-input"
          />
        </label>
        <label>
          Confim password:
          <input
            type="password"
            placeholder="Confirm Password"
            className="password-input"
          />
        </label> */}
        <button>Register</button>
      </form>

      <div className="register-subtext">
        Already have an account?{" "}
        <div className="redirect" onClick={() => setLogin(true)}>
          Log in
        </div>
      </div>
    </div>
  );
};

export default Register;
