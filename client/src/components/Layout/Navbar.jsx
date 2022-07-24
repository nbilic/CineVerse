import "../../styles/navbar.css";
import logo from "../../images/logo-svg.svg";
import { BsSearch } from "react-icons/bs";
import useRouteToProfile from "../../hooks/useRouteToProfile";
import { IoMdPerson, IoMdNotificationsOutline } from "react-icons/io";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import NavbarRoutes from "./NavbarRoutes";
import NavbarDropdown from "./NavbarDropdown";
import useToggle from "../../hooks/useToggle";
import { TbLayoutSidebarRightExpand } from "react-icons/ti";
import SidebarMobile from "../../pages/SidebarMobile";

const Navbar = () => {
  const navigate = useNavigate();
  const [routes, toggleRoutes] = useToggle(false);
  const [details, toggleDetails] = useToggle(false);
  const { user } = useSelector((state) => state.user);

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
            <div className="mobile-position-arrow">
              <BiArrowToRight
                onClick={() => {
                  toggleRoutes();
                  toggleDetails(false);
                }}
              />
            </div>
            <img src={user.avatar} alt="" className="avatar" />
            <div className="mobile-position-arrow">
              <BiArrowToLeft
                onClick={() => {
                  toggleRoutes(false);
                  toggleDetails();
                }}
              />
            </div>
          </div>
        </div>
      </nav>
      {
        <div className={`high-z mobile-position `}>
          <NavbarRoutes routes={routes} />

          {<SidebarMobile details={details} />}
        </div>
      }
    </>
  );
};

export default Navbar;
