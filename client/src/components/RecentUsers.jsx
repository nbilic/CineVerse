import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "../components/API_URL";
import { useSelector, useDispatch } from "react-redux";
import "../styles/recentUsers.css";
import { setUser } from "../redux/user";
const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const checkIfFriends = (receiver) =>
    user.friends?.find((r) => r === receiver._id);

  const checkIfAdded = (profile) =>
    user?.outgoingRequests?.find((u) => u === profile._id);

  const handleAddFriend = async (receiver) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/user/addfriend`,
        {
          receiverId: receiver._id,
          senderId: user._id,
        },

        { withCredentials: true }
      );
      await dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRecentUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/recent`, {
          params: { count: 10 },
          withCredentials: true,
        });

        setUsers([...response.data]);
      } catch (error) {
        console.log("error => ", error);
      }
    };

    getRecentUsers();
  }, []);

  return (
    <div className="recent-users">
      <h5>Recent users</h5>
      <ul>
        {users.map((profile) => (
          <li key={profile._id}>
            <div className="recent-users-upper">
              <img src={profile.avatar} alt="" className="user-avatar" />
              <div className="recent-users-right">
                <p>{`${profile.firstName} ${profile.lastName}`}</p>
                <p className="recent-users-handle">{`@${profile.handle}`}</p>
              </div>
            </div>
            {/* <button
              className="add-friend-button d"
              onClick={() => handleAddFriend(profile)}
            >
              {checkIfFriends(profile)
                ? "FRIENDS"
                : checkIfAdded(profile)
                ? "PENDING"
                : "ADD FRIEND"}
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUsers;
