import { useEffect, useState, useRef } from "react";
import "../styles/votedBy.css";
import { AiOutlineClose } from "react-icons/ai";
import api from "../api/api";
import RotateLoader from "react-spinners/RotateLoader";
import { disableScroll, enableScroll } from "../functions/modifyScroll";
const VotedBy = ({ vote, votedBy, setDisplay, display }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef();
  useEffect(() => {
    const getListOfUsers = async () => {
      try {
        const response = await api.get(`/api/user/users`, {
          params: { users: votedBy },
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getListOfUsers();
  }, []);

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
    <div className="voted-by-modal">
      <div className="users-container" ref={ref}>
        <div className="users-container-upper">
          <h2>{vote === "LIKE" ? "Liked by" : "Disliked by"}</h2>
          <AiOutlineClose
            className="close-votedBy-modal"
            onClick={() => setDisplay(false)}
          />
        </div>
        {loading && (
          <div className="loader-container">
            <RotateLoader color="lightblue" size={5} loading={loading} />
          </div>
        )}
        {users.map((user) => (
          <div className="user" key={user._id}>
            <img src={user.avatar} alt="" className="user-img" />
            <p>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotedBy;
