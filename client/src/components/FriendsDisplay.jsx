import "../styles/friendsdisplay.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import apiUrl from "./API_URL";

const FriendsDisplay = () => {
  const { user } = useSelector((state) => state.user);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/user/friends/${user._id}`
        );
        setFriends(response.data);
      } catch (error) {
        console.log("error => ", error);
      }
    };

    user._id && getFriends();
  }, [user]);
  return (
    <div className="friends-display">
      <h5>Friends</h5>
      <input type="text" placeholder="Search Friends..." />
      {!friends.length && <p>You have no friends</p>}
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>
            <img src={friend.avatar} alt="" className="friend-avatar" />
            <div className="name-handle">
              <p>{`${friend.firstName} ${friend.lastName}`}</p>
              <p className="friend-handle">{`@${friend.firstName}${friend.lastName}`}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsDisplay;
