import { useNavigate } from "react-router-dom";
import { IoMdPerson, IoMdNotificationsOutline } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { FiSettings } from "react-icons/fi";
import api from "../../api/api";

const NavbarDropdown = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await api.delete(`http://localhost:8080/auth/session`, {
        withCredentials: true,
      });
      navigate(`/signin`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="navbar-dropdown ">
      <li onClick={() => navigate("/settings")}>
        {/*  <FiSettings className="shortcut-icons" onClick={logOut} /> */}
        <span>Settings</span>
      </li>
      <li onClick={logOut}>
        {/*         <ImExit className="shortcut-icons logout-icon" /> */}
        <span> Logout</span>
      </li>
    </ul>
  );
};

export default NavbarDropdown;
