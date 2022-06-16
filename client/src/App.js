import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/Authentication/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import Test from "./components/Test";
import { useEffect, useState } from "react";
import { setSocket } from "./redux/socket";
import SinglePost from "./pages/SinglePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inbox from "./pages/Inbox";

const App = () => {
  //const setSocket = useSocket();
  const { user } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const notify = (input) => toast(input);
  useEffect(async () => {
    await dispatch(setSocket());
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("inf", (x) => {
        notify(x);
      });
    }
  }, [socket]);

  useEffect(() => {
    socket && user && socket?.emit("newUser", user._id);
  }, [user]);
  return (
    <div className="App">
      {/* {user && <EditProfileModal user={user} />} */}
      <ToastContainer />
      <Routes>
        <Route path="/signin" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Inbox />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/profile/:handle" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
