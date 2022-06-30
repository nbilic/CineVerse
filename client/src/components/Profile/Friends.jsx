import "../../styles/friendsdisplay.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../api/api";
import Friend from "../Friends/Friend";
import RotateLoader from "react-spinners/RotateLoader";

const Friends = ({ id }) => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await api.get(`/api/user/friends/${id}`);
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
      {loading && (
        <div className="loader-container">
          <RotateLoader color="lightblue" size={10} loading={loading} />
        </div>
      )}
      {!loading && (
        <>
          {/* <input type="text" placeholder="Search Friends..." /> */}
          {!friends.length && (
            <p className="no-friends">This user has no friends </p>
          )}
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

export default Friends;
