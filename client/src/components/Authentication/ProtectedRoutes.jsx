import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user";
import Loading from "../Loading";
import api from "../../api/api";

const ProtectedRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const relogUser = async () => {
    try {
      const response = await api.get("/auth/session");
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
    <Loading />
  ) : isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} />
  );
};
export default ProtectedRoutes;
