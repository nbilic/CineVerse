import "../../styles/friendsdisplay.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Friend from "./Friend";

const FriendsDisplay = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(`/api/user/friends/${user._id}`);
        setFriends(response.data);
      } catch (error) {
        console.log("error => ", error);
      } finally {
        setLoading(false);
      }
    };

    user._id && getFriends();
  }, [user]);
  return (
    <div className="friends-display">
      <h5>FRIENDS</h5>
      {!loading && (
        <>
          {!friends.length && <p>You have no friends</p>}
          <ul>
            {friends.map((friend) => (
              <Friend key={friend._id} friend={friend} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FriendsDisplay;
