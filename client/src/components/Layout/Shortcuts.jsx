import { HiOutlineClipboardList, HiUserGroup } from "react-icons/hi";
import { BiMessageDetail, BiNews, BiCog } from "react-icons/bi";
import { IoMdPerson } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { AiOutlineBarChart } from "react-icons/ai";
import axios from "axios";
import { FiSettings } from "react-icons/fi";
import "../../styles/shortcuts.css";
import { useNavigate } from "react-router-dom";
const Shortcuts = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      await axios.delete(`http://localhost:8080/auth/session`, {
        withCredentials: true,
      });
      navigate(`/signin`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="shortcuts">
      <h5>Shortcuts</h5>
      <ul>
        <li>
          {" "}
          <HiOutlineClipboardList className="shortcut-icons" /> Timeline
        </li>
        <li>
          {" "}
          <BiNews className="shortcut-icons" /> News
        </li>
        <li>
          <HiUserGroup className="shortcut-icons" /> Forum
        </li>
        <li onClick={() => navigate("/chat")}>
          <BiMessageDetail className="shortcut-icons" /> Inbox
        </li>
        <li>
          {" "}
          <IoMdPerson className="shortcut-icons" /> Friends
        </li>
        <li>
          {" "}
          <AiOutlineBarChart className="shortcut-icons" /> Insights
        </li>
        <li>
          {" "}
          <FiSettings className="shortcut-icons" /> Settings
        </li>
        <li onClick={logOut}>
          {" "}
          <ImExit className="shortcut-icons logout-icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Shortcuts;
