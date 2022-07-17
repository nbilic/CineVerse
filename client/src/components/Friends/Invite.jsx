import { useDispatch, useSelector } from "react-redux";
import useManageFriends from "../../hooks/useManageFriends";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import reqConstants from "../../api/reqConstants";
import useRouteToProfile from "../../hooks/useRouteToProfile";

const Invite = ({ profile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const routeToProfile = useRouteToProfile(profile.handle);
  const { ACCEPT, DENIE } = reqConstants;
  const manageFriends = useManageFriends();
  return (
    <div className="invite" key={profile._id}>
      <img
        src={profile.avatar}
        alt=""
        className="invite-avatar"
        onClick={routeToProfile}
      />

      <p
        className="invite-username"
        onClick={routeToProfile}
      >{`${profile.firstName} ${profile.lastName}`}</p>
      <div className="invite-actions">
        <FcCheckmark
          className="accept-button"
          onClick={() => manageFriends(ACCEPT, profile)}
        />
        <AiOutlineClose
          className="denie-button"
          onClick={() => manageFriends(DENIE, profile)}
        />
      </div>
    </div>
  );
};

export default Invite;
