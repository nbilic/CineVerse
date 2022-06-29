import "../../styles/profileDisplay.css";
import { GoLocation, GoCalendar } from "react-icons/go";
import { AiOutlineLink, AiOutlineMessage } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { FiBook } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { BiMoviePlay } from "react-icons/bi";
import { ImImages } from "react-icons/im";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useManageFriends from "../../hooks/useManageFriends";
import reqConstants from "../../api/reqConstants";
import useToggle from "../../hooks/useToggle";
import ConfirmAction from "../Modals/ConfirmAction";
import EditProfileModal from "./EditProfileModal";
import FriendsInCommon from "./FriendsInCommon";
import ImageModal from "../Modals/ImageModal";

const [ACTIVITY, ABOUTME, FRIENDS, GROUPS, MOVIES, MEDIA] = [
  "ACTIVITY",
  "ABOUTME",
  "FRIENDS",
  "GROUPS",
  "MOVIES",
  "MEDIA",
];

const ProfileDisplay = ({ profile, setTab }) => {
  const { user } = useSelector((state) => state.user);
  const [buttonText, setButtonText] = useState("");
  const [friendsWithUser, setFriendsWithUser] = useState(false);
  const [commonFriends, setCommonFriends] = useState([]);
  const [imageModalContent, setImageModalContent] = useState(null);
  const [value, setValue] = useToggle(false);
  const [edit, toggleEdit] = useToggle(false);
  const [imageModal, toggleImageModal] = useToggle(false);
  const [displayCommonFriends, toggleDisplayCommonFriends] = useToggle(false);
  const [confirmActionText, setConfirmActionText] = useState("");
  const manageFriends = useManageFriends();
  const { ADD, REM, CHECK_ADDED, CHECK_FRIENDS, CANCEL, PENDING, EDIT } =
    reqConstants;

  const handleAction = async () => {
    if (user._id === profile?._id) toggleEdit();
    else if (buttonText === ADD) manageFriends(ADD, profile);
    else if (buttonText === PENDING) {
      manageFriends(CANCEL, profile);
    } else if (buttonText === REM) {
      manageFriends(REM, profile);
      setFriendsWithUser(false);
    }
    setValue(false);
  };

  const getButtonText = async () => {
    if (user._id === profile?._id) setButtonText(EDIT);
    else if (await manageFriends(CHECK_FRIENDS, profile)) {
      setFriendsWithUser(true);
      setConfirmActionText(
        `Are you sure you want to remove this user from friends?`
      );
      setButtonText(REM);
    } else if (await manageFriends(CHECK_ADDED, profile)) {
      setConfirmActionText(`Are you sure you want to cancel this request?`);
      setButtonText(PENDING);
    } else setButtonText(ADD);
    // ADD FRIENDS MSG
  };

  const editImageModal = (img) => {
    setImageModalContent(img);
    toggleImageModal();
  };
  useEffect(() => {
    const getCommonFriends = async () => {
      const common = user.friends.filter(
        (val) => profile.friends.indexOf(val) != -1
      );
      setCommonFriends(common);
    };
    getButtonText();
    getCommonFriends();
  }, [user, profile]);

  return (
    <div className="profile-display-container">
      {imageModal && (
        <ImageModal
          display={imageModal}
          setDisplay={toggleImageModal}
          img={imageModalContent}
        />
      )}
      {displayCommonFriends && (
        <FriendsInCommon
          friends={commonFriends}
          display={displayCommonFriends}
          setDisplay={toggleDisplayCommonFriends}
        />
      )}
      {edit && (
        <EditProfileModal user={user} display={edit} setDisplay={toggleEdit} />
      )}
      {value && (
        <ConfirmAction
          setDisplayConfirmAction={setValue}
          confirmAction={handleAction}
          content={confirmActionText}
        />
      )}

      <div className="upper-container">
        <img
          src={profile?.banner}
          alt=""
          className="banner"
          onClick={() => editImageModal(profile?.banner)}
        />
      </div>

      <div className="bottom-container">
        <div className="profile-cross-section">
          <img
            src={profile?.avatar}
            alt=""
            className="profile-avatar"
            onClick={() => editImageModal(profile?.avatar)}
          />
          <div className="profile-info-stuff">
            <h5 className="profile-name">{`${profile?.fullName}`}</h5>
            <p className="profile-handle">{`@${profile?.handle}`}</p>
          </div>
          <div className="user-interactions">
            {friendsWithUser && (
              <AiOutlineMessage className="send-message-icon" />
            )}
            <button
              onClick={
                buttonText === ADD || buttonText === EDIT
                  ? handleAction
                  : setValue
              }
            >
              {buttonText}
            </button>
          </div>
        </div>

        <ul className="profile-tabs">
          <li onClick={() => setTab(ACTIVITY)}>
            <CgNotes className="profile-icon" />
            <span>Activity</span>
          </li>
          <li onClick={() => setTab(ABOUTME)}>
            <FiBook className="profile-icon" />
            <span>About me</span>
          </li>
          <li onClick={() => setTab(FRIENDS)}>
            <FaUserFriends className="profile-icon" />
            <span>Friends</span>
          </li>
          <li onClick={() => setTab(GROUPS)}>
            <HiUserGroup className="profile-icon" />
            <span>Groups</span>
          </li>
          <li onClick={() => setTab(MOVIES)}>
            <BiMoviePlay className="profile-icon" />
            <span>Movies</span>
          </li>
          <li onClick={() => setTab(MEDIA)}>
            <ImImages className="profile-icon" />
            <span>Media</span>
          </li>
        </ul>

        {/*   <h5 className="profile-name">{`${profile?.fullName}`}</h5>
        <p className="profile-handle">{`@${profile?.handle}`}</p>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="profile-personal-info">
          {profile?.location && (
            <div>
              <GoLocation /> <p>{profile?.location}</p>
            </div>
          )}
          {profile?.link && (
            <div>
              <AiOutlineLink />
              <a href={`https://${profile?.link}`}>
                <p>{profile?.link}</p>
              </a>
            </div>
          )}
          <div>
            <GoCalendar />
            <p>Joined {new Date(profile?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {
          <div className="profile-stats">
        
            {user._id !== profile._id && (
              <p
                className="stat"
                onClick={toggleDisplayCommonFriends}
              >{`You have ${commonFriends.length} friend${
                commonFriends.length === 1 ? "" : "s"
              } in common`}</p>
            )}
          </div>
        } */}
      </div>
    </div>
  );
};

export default ProfileDisplay;
