import useRouteToProfile from "../../hooks/useRouteToProfile";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Friend = ({ friend }) => {
  const routeToProfile = useRouteToProfile(friend.handle);
  const { friends: onlineFriends } = useSelector((state) => state.friends);

  const checkIfOnline = () => onlineFriends.find((f) => friend._id === f._id);
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
      {/* <div
        className={`friend-status-block ${
          checkIfOnline(friend._id) ? "friend-online" : "friend-offline"
        }`} 
      />*/}
    </li>
  );
};

export default Friend;
