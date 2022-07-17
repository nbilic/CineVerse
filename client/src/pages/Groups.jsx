import Navbar from "../components/Layout/Navbar";
import SearchGroups from "../components/Groups/SearchGroups";
import FriendInvites from "../components/Friends/FriendInvites";
import Calendar from "../components/Layout/Calendar";
import OnlineFriends from "../components/Friends/OnlineFriends";
import RotateLoader from "react-spinners/RotateLoader";
import { useState } from "react";
import GroupSearchDisplay from "../components/Groups/GroupSearchDisplay";
import "../styles/groups.css";
import CreateNewGroupButton from "../components/Groups/CreateNewGroupButton";
import CreateNewGroupModal from "./CreateNewGroupModal";

const groups = [
  {
    name: "John Travolta Fan Club",
    members: 10,
  },
];

const Groups = () => {
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(false);

  const toggleCreate = () => setCreate(!create);
  return (
    <div className="groups-display">
      <Navbar />
      <div className="main-content grid-container groups-container">
        <div className="center grid-item">
          <div className="posts-container">
            <div className="test-cont">
              <div className="groups-container-homepage posts-container-homepage">
                {loading && (
                  <div className="loader-container">
                    <RotateLoader
                      color="lightblue"
                      size={10}
                      loading={loading}
                      margin="2"
                    />
                  </div>
                )}

                <GroupSearchDisplay />
              </div>

              <div className="sidebar-content">
                <SearchGroups />
                <CreateNewGroupButton toggleCreate={toggleCreate} />
                {create && <CreateNewGroupModal />}
                {/* <FriendInvites />
                <OnlineFriends /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
