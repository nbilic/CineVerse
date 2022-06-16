import "../../styles/navbar.css";
import logo from "../../images/logo-4.png";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const routeToHome = () => {
    navigate("/");
  };
  return (
    <>
      <nav className="navbar">
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
        </div>
        <div className="icons">
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />

            <BsSearch className="icon search-icon" />
          </div>
          <img src={user.avatar} alt="" className="avatar" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
