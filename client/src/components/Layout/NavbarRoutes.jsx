import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSettings } from "react-icons/fi";
import api from "../../api/api";
import { AiOutlineMessage } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import useToggle from "../../hooks/useToggle";
const NavbarRoutes = ({ routes }) => {
  const { user } = useSelector((state) => state.user);
  const [calendar, toggleCalendar] = useToggle(false);
  const [invites, toggleInvites] = useToggle(false);
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
    <div
      className={`navbar-routes ${routes ? "display-routes" : "hide-routes"}`}
    >
      <ul>
        <div className="navbar-combo">
          <CgNotes className="cool-icon mobile-positionx" />
          <li onClick={() => navigate("/")}>Timeline</li>
        </div>
        <div className="navbar-combo-dropdown ">
          <BiMoviePlay className="cool-icon mobile-positionx" />
          <li className="dropdown">
            Movies
            <div
              className={`dropdown-content ${routes ? "" : "hide-dropdown"}`}
            >
              <ul>
                <li onClick={() => navigate("/movies/trending")}>TRENDING</li>
                <li onClick={() => navigate("/movies/upcoming")}>UPCOMING</li>
                <li onClick={() => navigate("/movies/search")}>SEARCH</li>
              </ul>
            </div>
          </li>
        </div>

        <div className="navbar-combo">
          <AiOutlineMessage className="cool-icon mobile-positionx" />
          <li onClick={() => navigate(`/chat`)}>MESSAGES</li>
        </div>
        <div className="navbar-combo">
          <HiUserGroup className="cool-icon mobile-positionx" />

          <li onClick={() => navigate(`/profile/${user.handle}`)}>PROFILE</li>
        </div>

        <div className="navbar-combo">
          <ImExit className="cool-icon mobile-positionx" />

          <li onClick={logOut}>LOGOUT</li>
        </div>
      </ul>
    </div>
  );
};

export default NavbarRoutes;
