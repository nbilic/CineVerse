import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import "./styles/app.css";
import { setUser } from "./redux/user";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Profile from "./pages/Profile";
const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const relogUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/session", {
          withCredentials: true,
        });
        await dispatch(setUser(response.data));
      } catch (error) {
        console.log("error => ", error);
      }
    };

    relogUser();
  }, []);
  return (
    <Routes>
      <Route path="/signin" element={<Signup />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/profile/:handle" element={<Profile />} />
    </Routes>
  );
};

export default App;
