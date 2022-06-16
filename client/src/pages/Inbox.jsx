import Chatbox from "../components/Chat/Chatbox";
import Navbar from "../components/Layout/Navbar";
import Shortcuts from "../components/Layout/Shortcuts";
import UserDisplay from "../components/Layout/UserDisplay";
import "../styles/inbox.css";
const Inbox = () => {
  return (
    <div className="inbox">
      <Navbar />
      <div className="main-content grid-container">
        <div className="sidebar">
          <UserDisplay />
          <Shortcuts />
        </div>

        <Chatbox />
      </div>
    </div>
  );
};

export default Inbox;
