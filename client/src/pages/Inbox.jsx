import Chat from "../components/Chat/Chat";
import Chatbox from "../components/Chat/Chatbox";
import Navbar from "../components/Layout/Navbar";
import SearchUsers from "../components/Layout/SearchUsers";
import FriendInvites from "../components/Friends/FriendInvites";
import OnlineFriends from "../components/Friends/OnlineFriends";
import Calendar from "../components/Layout/Calendar";
import UserFound from "../components/Users/UserFound";
import "../styles/inbox.css";
const Inbox = () => {
  return (
    <div className="inbox">
      <Navbar />
      <div className="center grid-item">
        <div className="posts-container special">
          <div className="test-cont">
            <div className="posts-container-homepage users-found">
              <Chat />
            </div>
            <div className="sidebar-content desktop-position">
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

export default Inbox;
