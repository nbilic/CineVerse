import "../../styles/friendInvites.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Invite from "./Invite";
import api from "../../api/api";
const FriendInvites = () => {
  const { user } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getInvites = async () => {
      try {
        const response = await api.get(`/api/user/requests/${user._id}`);
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
        <Invite key={profile._id} profile={profile} />
      ))}
    </div>
  );
};

export default FriendInvites;
