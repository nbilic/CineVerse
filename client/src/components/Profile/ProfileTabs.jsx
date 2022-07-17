import { CgNotes } from "react-icons/cg";
import { FiBook } from "react-icons/fi";
import { IoStatsChart } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { ImImages } from "react-icons/im";

const [ACTIVITY, ABOUTME, FRIENDS, GROUPS, MOVIES, MEDIA, STATS] = [
  "ACTIVITY",
  "ABOUTME",
  "FRIENDS",
  "GROUPS",
  "MOVIES",
  "MEDIA",
  "STATS",
];

const ProfileTabs = ({ setTab, tab }) => {
  return (
    <ul className="profile-tabs">
      <li
        onClick={() => setTab(ACTIVITY)}
        className={`${tab === ACTIVITY && "active"}`}
      >
        <CgNotes className="profile-icon" />
        <span className="desktop-position">Activity</span>
      </li>
      <li
        onClick={() => setTab(ABOUTME)}
        className={`${tab === ABOUTME && "active"}`}
      >
        <FiBook className="profile-icon" />
        <span className="desktop-position">About me</span>
      </li>
      <li
        onClick={() => setTab(FRIENDS)}
        className={`${tab === FRIENDS && "active"}`}
      >
        <FaUserFriends className="profile-icon" />
        <span className="desktop-position">Friends</span>
      </li>
      <li
        onClick={() => setTab(GROUPS)}
        className={`${tab === GROUPS && "active"}`}
      >
        <HiUserGroup className="profile-icon" />
        <span className="desktop-position">Groups</span>
      </li>
      <li
        onClick={() => setTab(MOVIES)}
        className={`${tab === MOVIES && "active"}`}
      >
        <BiMoviePlay className="profile-icon" />
        <span className="desktop-position">Movies</span>
      </li>
      <li
        onClick={() => setTab(MEDIA)}
        className={`${tab === MEDIA && "active"}`}
      >
        <ImImages className="profile-icon" />
        <span className="desktop-position">Media</span>
      </li>
      <li
        onClick={() => setTab(STATS)}
        className={`${tab === STATS && "active"}`}
      >
        <IoStatsChart className="profile-icon" />
        <span className="desktop-position">Stats</span>
      </li>
    </ul>
  );
};

export default ProfileTabs;
