import { useDispatch, useSelector } from "react-redux";
import useManageFriends from "../../hooks/useManageFriends";
import { FcCheckmark } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";
import reqConstants from "../../api/reqConstants";
const Invite = ({ profile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { ACCEPT, DENIE } = reqConstants;
  const manageFriends = useManageFriends();
  return (
    <div className="invite" key={profile._id}>
      <img src={profile.avatar} alt="" className="invite-avatar" />

      <p className="invite-username">{`${profile.firstName} ${profile.lastName}`}</p>
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
