import "../styles/userDisplay.css";
import { useSelector } from "react-redux";
import useRouteToProfile from "../hooks/useRouteToProfile";
const UserDisplay = () => {
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(user?.handle);

  return (
    <div className="user-display-card">
      <img
        src={user.avatar}
        alt=""
        className="user-avatar"
        onClick={routeToProfile}
      />
      <div className="user-details">
        <p
          className="user-name"
          onClick={routeToProfile}
        >{`${user.firstName} ${user.lastName}`}</p>
        <p
          className="user-handle"
          onClick={routeToProfile}
        >{`@${user.handle}`}</p>
      </div>
    </div>
  );
};

export default UserDisplay;
