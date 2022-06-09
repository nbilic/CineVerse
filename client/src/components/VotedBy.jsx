import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/votedBy.css";
import apiUrl from "./API_URL";
import { AiOutlineClose } from "react-icons/ai";
const VotedBy = ({ vote, votedBy, setDisplay, display }) => {
  const [users, setUsers] = useState([]);
  const ref = useRef();
  useEffect(() => {
    const getListOfUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/users`, {
          params: { users: votedBy },
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getListOfUsers();
  }, []);

  useEffect(() => {
    if (display) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        document.body.style.overflow = "scroll";
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
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
