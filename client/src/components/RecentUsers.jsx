import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/recentUsers.css";
import RecentUser from "./RecentUser";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getRecentUsers = async () => {
      try {
        const response = await api.get(`/api/user/recent`, { count: 10 });
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
          <RecentUser profile={profile} key={profile._id} />
        ))}
      </ul>
    </div>
  );
};

export default RecentUsers;
