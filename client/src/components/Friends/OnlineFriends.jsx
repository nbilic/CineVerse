import "../../styles/friendsdisplay.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { MdCircle } from "react-icons/md";
import OnlineFriend from "./OnlineFriend";

const OnlineFriends = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const { friends: onlineFriends } = useSelector((state) => state.friends);

  const checkIfOnline = (friend) =>
    onlineFriends.find((f) => friend._id === f._id);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(`/api/user/friends/${user._id}`);
        setFriends(response.data.filter((f) => checkIfOnline(f)));
      } catch (error) {
        console.log("error => ", error);
      } finally {
        setLoading(false);
      }
    };

    user._id && getFriends();
  }, [user, onlineFriends]);
  return (
    <div className="online-friends-display">
      <h5>Friends online</h5>
      {!loading && (
        <>
          {/* <input type="text" placeholder="Search Friends..." /> */}
          {!friends.length && <p>No one is online</p>}
          <ul>
            {friends.map((friend) => (
              <OnlineFriend key={friend._id} friend={friend} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OnlineFriends;
