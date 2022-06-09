import "../styles/friendInvites.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setUser } from "../redux/user";
import apiUrl from "./API_URL";
const FriendInvites = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const handleFriend = async (type, profile) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/user/managerequests`,
        {
          receiverId: user._id,
          senderId: profile._id,
          decision: type,
        },
        {
          withCredentials: true,
        }
      );
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log("error => ", error);
    }
  };
  useEffect(() => {
    const getInvites = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/user/requests/${user._id}`
        );

        setUsers(response.data.incoming);
      } catch (error) {
        console.log(error);
      }
    };
    user._id && getInvites();
  }, [user]);
  return (
    <div className="friend-invites-container">
      <h5>Invites</h5>
      {!users.length && <p>No invites pending...</p>}
      {users.map((profile) => (
        <div className="invite" key={profile._id}>
          <img src={profile.avatar} alt="" className="invite-avatar" />
          <div className="right-side">
            <p className="invite-username">{`${profile.firstName} ${profile.lastName}`}</p>
            <div className="invite-actions">
              <button
                className="accept-button"
                onClick={() => handleFriend("ACCEPT", profile)}
              >
                ACCEPT
              </button>
              <button
                className="denie-button"
                onClick={() => handleFriend("DENIE", profile)}
              >
                DENIE
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendInvites;
