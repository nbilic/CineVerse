import FriendInvites from "../components/Friends/FriendInvites";
import OnlineFriends from "../components/Friends/OnlineFriends";
import Calendar from "../components/Layout/Calendar";
import Navbar from "../components/Layout/Navbar";
import SearchUsers from "../components/Layout/SearchUsers";

const SidebarMobile = ({ details }) => {
  return (
    <div
      className={`sidebar-mobile ${
        details ? "display-sidebar" : "hide-sidebar"
      }`}
    >
      <SearchUsers />
      <FriendInvites />
      <OnlineFriends />
      <Calendar />
    </div>
  );
};

export default SidebarMobile;
