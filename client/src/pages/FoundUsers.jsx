import Friend from "../components/Friends/Friend";
import Navbar from "../components/Layout/Navbar";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/api";
import SearchUsers from "../components/Layout/SearchUsers";
import FriendInvites from "../components/Friends/FriendInvites";
import OnlineFriends from "../components/Friends/OnlineFriends";
import Calendar from "../components/Layout/Calendar";
import UserFound from "../components/Users/UserFound";
import Chat from "../components/Chat/Chat";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
const FoundUsers = () => {
  const [users, setUsers] = useState([]);
  let query = useQuery();

  useEffect(() => {
    const searchUser = async () => {
      try {
        const response = await api.get("/api/user/search", {
          params: { substr: query.get("user") },
        });
        setUsers(response.data);
        /*  console.log(response.data); */
      } catch (error) {
        console.log(error.message);
      }
    };

    searchUser();
  }, [query]);

  return (
    <div className="found-users">
      <Navbar />
      <div className="center grid-item">
        <div className="posts-container special">
          <div className="mobile-position-search">
            <SearchUsers />
          </div>
          <div className="test-cont">
            <div className="posts-container-homepage users-found">
              <h4>Users found: {users.length}</h4>
              {users?.map((user) => (
                <UserFound key={user._id} friend={user} />
              ))}
            </div>
            <div className="sidebar-content">
              <SearchUsers />
              <FriendInvites />
              {/* <RecentActivity /> */}
              <OnlineFriends />
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundUsers;
