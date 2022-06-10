import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signup />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile/:handle" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
