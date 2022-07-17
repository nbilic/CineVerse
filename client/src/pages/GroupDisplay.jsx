import ChatFriendDisplay from "../components/Chat/ChatFriendDisplay";
import Group from "../components/Groups/Group";
import GroupMembers from "../components/Groups/GroupMembers";
import GroupsSideBar from "../components/Groups/GroupsSideBar";
import Navbar from "../components/Layout/Navbar";
import Friends from "../redux/friends";

const GroupDisplay = () => {
  return (
    <div>
      <Navbar />
      <div className="group-display">
        <div className="groups-left-side">
          <Group />
          <GroupsSideBar />
        </div>
        <div className="groups-center">{/* <GroupNavbar /> */}</div>
      </div>
    </div>
  );
};

export default GroupDisplay;
