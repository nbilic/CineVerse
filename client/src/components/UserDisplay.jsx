import "../styles/userDisplay.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserDisplay = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const routeToProfile = (handle) => {
    navigate(`/profile/${handle}`);
  };
  return (
    <div className="user-display-card">
      <img
        src={user.avatar}
        alt=""
        className="user-avatar"
        onClick={() => routeToProfile(user.handle)}
      />
      <div className="user-details">
        <p
          className="user-name"
          onClick={() => routeToProfile(user.handle)}
        >{`${user.firstName} ${user.lastName}`}</p>
        <p
          className="user-handle"
          onClick={() => routeToProfile(user.handle)}
        >{`@${user.handle}`}</p>
      </div>
    </div>
  );
};

export default UserDisplay;
