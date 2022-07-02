import useRouteToProfile from "../../hooks/useRouteToProfile";
import { useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import useManageFriends from "../../hooks/useManageFriends";
import reqConstants from "../../api/reqConstants";
import { useEffect } from "react";
import { useState } from "react";

const UserFound = ({ friend }) => {
  const routeToProfile = useRouteToProfile(friend.handle);
  const manageFriends = useManageFriends();
  const { friends: onlineFriends } = useSelector((state) => state.friends);
  const [friendStatus, setFriendStatus] = useState(0);
  const { ADD, REM, CHECK_ADDED, CHECK_FRIENDS, CANCEL, PENDING, EDIT } =
    reqConstants;
  const checkIfOnline = () => onlineFriends.find((f) => friend._id === f._id);

  useEffect(() => {
    const checkFriendStatus = async () => {
      try {
        const status = await manageFriends(CHECK_FRIENDS, friend);
        setFriendStatus(status);
      } catch (error) {
        console.log(error.message);
      }
    };

    checkFriendStatus();
  }, []);
  return (
    <div className="user-found-div">
      <div className="grid-item-1">
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
      </div>
      <div className="grid-item-2">{friend.bio}</div>
      <div className="grid-item-3">
        {!friendStatus ? (
          <AiOutlinePlus
            className="add-button"
            onClick={() => manageFriends(ADD, friend)}
          />
        ) : (
          <AiOutlineClose
            className="denie-button"
            onClick={() => manageFriends(REM, friend)}
          />
        )}
      </div>
    </div>
  );
};

export default UserFound;
