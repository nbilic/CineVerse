import "../styles/signup.css";
import logo from "../images/logo-2.png";
import Login from "../components/Login";
import Register from "../components/Register";
import { useState } from "react";
const Signup = () => {
  const [login, setLogin] = useState(true);
  return (
    <div className="signup-body">
      <div className="signup-card">
        <div className="left-side-card">
          {/* <img src={logo} alt="" className="logo" /> */}
          <h1 className="h1">CineVerse</h1>
        </div>
        <div className="line"></div>
        <div className="right-side-card">
          {login ? (
            <Login setLogin={setLogin} />
          ) : (
            <Register setLogin={setLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
