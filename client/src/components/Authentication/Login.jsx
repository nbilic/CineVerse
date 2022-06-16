import { useEffect, useState } from "react";
import FormInput from "./FormInput";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/user";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
const Login = ({ setLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [inputs] = useState([
    {
      id: 1,
      name: "email",
      type: "email",
      label: "E-mail",
      placeholder: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
    },
  ]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await api.post(`/auth/login`, {
        password: values.password,
        email: values.email,
      });

      await dispatch(setUser(response.data.user));
      navigate(`/`);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
