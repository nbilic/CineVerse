import { useDispatch, useSelector } from "react-redux";
import useManageFriends from "../hooks/useManageFriends";
import reqConstants from "../api/reqConstants";
const Invite = ({ profile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { ACCEPT, DENIE } = reqConstants;
  const manageFriends = useManageFriends();
  /*   const handleFriend = async (type, profile) => {
    try {
      const response = await api.put(`/api/user/managerequests`, {
        receiverId: user._id,
        senderId: profile._id,
        decision: type,
      });
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log("error => ", error);
    }
  }; */

  return (
    <div className="invite" key={profile._id}>
      <img src={profile.avatar} alt="" className="invite-avatar" />
      <div className="right-side">
        <p className="invite-username">{`${profile.firstName} ${profile.lastName}`}</p>
        <div className="invite-actions">
          <button
            className="accept-button"
            onClick={() => manageFriends(ACCEPT, profile)}
          >
            {ACCEPT}
          </button>
          <button
            className="denie-button"
            onClick={() => manageFriends(DENIE, profile)}
          >
            {DENIE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
