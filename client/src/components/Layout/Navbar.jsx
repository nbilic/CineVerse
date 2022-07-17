import "../../styles/navbar.css";
import logo from "../../images/logo-svg.svg";
import { BsSearch } from "react-icons/bs";
import useRouteToProfile from "../../hooks/useRouteToProfile";
import { IoMdPerson, IoMdNotificationsOutline } from "react-icons/io";
import { BiMessageDetail, BiNews, BiCog } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import NavbarRoutes from "./NavbarRoutes";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(user?.handle);
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
  const routeToHome = () => {
    navigate("/");
  };
  return (
    <>
      <nav className="navbar high-z">
        <div className="navbar-container">
          <div className="dropdown-menus">
            <img
              src={logo}
              alt=""
              className="navbar-logo"
              onClick={routeToHome}
            />
            <p className="site-name" onClick={routeToHome}>
              CineVerse
            </p>
            <div className="desktop-position">
              <NavbarRoutes />
            </div>
          </div>

          <div className="icons">
            <ul>
              <li onClick={() => navigate("/chat")}>
                <BiMessageDetail className="shortcut-icons" />
              </li>
              <li>
                {" "}
                <IoMdNotificationsOutline className="shortcut-icons" />
              </li>

              <li>
                {" "}
                <FiSettings className="shortcut-icons" onClick={logOut} />
              </li>
              {/*    <li onClick={logOut}>
          {" "}
          <ImExit className="shortcut-icons logout-icon" /> Logout
        </li> */}
            </ul>
            <img
              src={user.avatar}
              alt=""
              className="avatar"
              onClick={routeToProfile}
            />
          </div>
        </div>
      </nav>
      <div className="mobile-position high-z">
        <NavbarRoutes />
      </div>
    </>
  );
};

export default Navbar;
