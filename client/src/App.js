import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/Authentication/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSocket } from "./redux/socket";
import {
  setFriends,
  addNewFriendOnline,
  removeFriendFromOnline,
} from "./redux/friends";
import SinglePost from "./pages/SinglePost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inbox from "./pages/Inbox";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import SingleMovie from "./pages/SingleMovie";
import UpcomingMovies from "./pages/UpcomingMovies";
import SearchMovies from "./pages/SearchMovies";
import FoundUsers from "./pages/FoundUsers";
import Groups from "./pages/Groups";

import CreateNewGroupModal from "./pages/CreateNewGroupModal";
import GroupDisplay from "./pages/GroupDisplay";
import Settings from "./components/Layout/Settings";
import SidebarMobile from "./pages/SidebarMobile";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const { friends } = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const notify = (input) => toast.success(input, {});
  useEffect(async () => {
    await dispatch(setSocket());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("inf", (x) => {
        notify(x);
      });

      socket.on("online-friends", async (onlineFriends) => {
        await dispatch(setFriends(onlineFriends));
      });

      socket.on("friend-online", async (friend) => {
        await dispatch(addNewFriendOnline(friend));
      });

      socket.on("friend-offline", async (friend) => {
        await dispatch(removeFriendFromOnline(friend));
      });

      socket?.on("pm", async (x) => {
        /*  notify("YOU GOT MAIL"); */
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket && user)
      socket?.emit("newUser", { userId: user._id, friends: user.friends });
  }, [user]);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{ backgroundColor: "#212c38" }}
      />
      <Routes>
        <Route path="/signin" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Inbox />} />
          <Route path="/search" element={<FoundUsers />} />
          <Route path="/movies/trending" element={<TrendingMoviesPage />} />
          <Route path="/movies/upcoming" element={<UpcomingMovies />} />
          <Route path="/movies/search" element={<SearchMovies />} />
          <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/profile/:handle" element={<Profile />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group" element={<GroupDisplay />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<SidebarMobile />} />
          <Route path="/create-new-group" element={<CreateNewGroupModal />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
