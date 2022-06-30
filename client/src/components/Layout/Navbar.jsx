import "../../styles/navbar.css";
import logo from "../../images/logo-svg.svg";
import { BsSearch } from "react-icons/bs";
import useRouteToProfile from "../../hooks/useRouteToProfile";
import { IoMdPerson, IoMdNotificationsOutline } from "react-icons/io";
import { BiMessageDetail, BiNews, BiCog } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(user?.handle);
  const routeToHome = () => {
    navigate("/");
  };
  return (
    <>
      <nav className="navbar">
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
            <div className="navbar-routes">
              <ul>
                <li onClick={() => navigate("/")}>Timeline</li>
                <li className="dropdown">
                  Movies
                  <div className="dropdown-content">
                    <ul>
                      <li onClick={() => navigate("/movies/trending")}>
                        TRENDING
                      </li>
                      <li onClick={() => navigate("/movies/upcoming")}>
                        UPCOMING
                      </li>
                      <li onClick={() => navigate("/movies/search")}>SEARCH</li>
                    </ul>
                  </div>
                </li>

                <li onClick={() => navigate(`/profile/${user.handle}`)}>
                  PROFILE
                </li>
              </ul>
            </div>
          </div>

          <div className="icons">
            {/* <div className="search">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />

              <BsSearch className="icon search-icon" />
            </div> */}
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
                <FiSettings className="shortcut-icons" />
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
    </>
  );
};

export default Navbar;
