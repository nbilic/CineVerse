import useRouteToProfile from "../../hooks/useRouteToProfile";
import useManageFriends from "../../hooks/useManageFriends";
import { useEffect, useState } from "react";
import reqConstants from "../../api/reqConstants";
import { useSelector } from "react-redux";
const RecentUser = ({ profile }) => {
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(profile.handle);
  const [displayText, setDisplayText] = useState("");
  const [hoverText, setHoverText] = useState("");
  const manageFriends = useManageFriends();
  const { ADD, REM, CHECK_ADDED, CHECK_FRIENDS, CANCEL, PENDING } =
    reqConstants;

  useEffect(() => {
    const changeText = async () => {
      if (await manageFriends(CHECK_ADDED, profile)) setDisplayText(PENDING);
      else if (await manageFriends(CHECK_FRIENDS, profile))
        setDisplayText("FRIENDS");
      else setDisplayText(ADD);
    };
    changeText();
  }, [user]);
  return (
    <li key={profile._id}>
      <div className="recent-users-upper">
        <img
          src={profile.avatar}
          alt=""
          className="user-avatar"
          onClick={routeToProfile}
        />
        <div className="recent-users-right">
          <p
            onClick={routeToProfile}
          >{`${profile.firstName} ${profile.lastName}`}</p>
          <p
            className="recent-users-handle"
            onClick={routeToProfile}
          >{`@${profile.handle}`}</p>
        </div>
      </div>
      {/* <button className="add-friend-button" onClick={handleAction}>
        {displayText}
      </button> */}
    </li>
  );
};

export default RecentUser;
