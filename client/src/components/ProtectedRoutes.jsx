import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const relogUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/session", {
        withCredentials: true,
      });
      await dispatch(setUser(response.data));
      setIsAuth(true);
      setLoaded(true);
    } catch (error) {
      console.log("error => ", error);
      setLoaded(true);
    }
  };
  useEffect(() => {
    relogUser();
  }, []);

  return !loaded ? (
    <h5>Loading...</h5>
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} />
  );
};
export default ProtectedRoutes;
