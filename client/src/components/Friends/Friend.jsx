import useRouteToProfile from "../../hooks/useRouteToProfile";
import { useEffect } from "react";

const Friend = ({ friend }) => {
  const routeToProfile = useRouteToProfile(friend.handle);
  useEffect(() => {}, []);
  return (
    <li className="friend-li">
      <img
        src={friend.avatar}
        alt=""
        className="friend-avatar"
        onClick={routeToProfile}
      />
      <div className="name-handle">
        <p onClick={routeToProfile}>{`${friend.fullName}`}</p>
        <p
          className="friend-handle"
          onClick={routeToProfile}
        >{`@${friend.handle}`}</p>
      </div>
    </li>
  );
};

export default Friend;
