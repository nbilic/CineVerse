import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiUrl from "./API_URL";
import { setUser } from "../redux/user";
import { useDispatch, useSelector } from "react-redux";
const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "email",
      type: "email",
      label: "E-mail",
      placeholder: "Email",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          password: values.password,
          email: values.email,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      await dispatch(setUser(response.data.user));
      navigate(`/`);
    } catch (error) {
      /* notify(error.response.data.message); */
      console.log(error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* navigate(`/`); */
    login();
  };

  useEffect(() => {}, [user]);
  return (
    <div className="login-container">
      <h2 className="login-text">Log in</h2>

      <form onSubmit={handleSubmit} className="login-form">
        {inputs.map((input) => (
          <FormInput {...input} onChange={onChange} key={input.id} />
        ))}
        <button>Log in</button>
      </form>

      <div className="login-subtext">
        Don't have an account? {user?.firstName}
        <div className="redirect" onClick={() => setLogin(false)}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;
