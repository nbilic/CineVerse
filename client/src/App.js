import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EditProfileModal from "./components/EditProfileModal";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="App">
      {/* {user && <EditProfileModal user={user} />} */}
      <Routes>
        <Route path="/signin" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile/:handle" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
