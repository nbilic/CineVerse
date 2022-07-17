import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const NavbarRoutes = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="navbar-routes">
      <ul>
        <li onClick={() => navigate("/")}>Timeline</li>
        <li className="dropdown">
          Movies
          <div className="dropdown-content">
            <ul>
              <li onClick={() => navigate("/movies/trending")}>TRENDING</li>
              <li onClick={() => navigate("/movies/upcoming")}>UPCOMING</li>
              <li onClick={() => navigate("/movies/search")}>SEARCH</li>
            </ul>
          </div>
        </li>

        <li onClick={() => navigate(`/groups`)}>GROUPS</li>
        <li onClick={() => navigate(`/profile/${user.handle}`)}>PROFILE</li>
      </ul>
    </div>
  );
};

export default NavbarRoutes;
