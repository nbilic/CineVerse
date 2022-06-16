import { useEffect, useState, useRef } from "react";
import api from "../../api/api";
import Friend from "../Friends/Friend";
import "../../styles/friendsInCommon.css";
import { disableScroll, enableScroll } from "../../functions/modifyScroll";
const FriendsInCommon = ({ friends, display, setDisplay }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get(`/api/user/users`, {
          params: { users: friends },
        });
        setProfiles(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [friends]);

  useEffect(() => {
    if (display) disableScroll();
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      enableScroll();
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display]);
  return (
    <div className="common-friends-modal">
      <div className="common-friends-container" ref={ref}>
        {loading && "Loading..."}
        {!loading && <h2>Friends in common: </h2>}
        {profiles.map((profile) => (
          <Friend friend={profile} key={profile._id} />
        ))}
      </div>
    </div>
  );
};

export default FriendsInCommon;
