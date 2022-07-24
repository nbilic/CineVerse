import "../../styles/profileDisplay.css";
import { AiOutlineMessage } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useManageFriends from "../../hooks/useManageFriends";
import reqConstants from "../../api/reqConstants";
import useToggle from "../../hooks/useToggle";
import ConfirmAction from "../Modals/ConfirmAction";
import EditProfileModal from "./EditProfileModal";
import FriendsInCommon from "./FriendsInCommon";
import ImageModal from "../Modals/ImageModal";
import ProfileTabs from "./ProfileTabs";
import { FiSettings } from "react-icons/fi";
import Settings from "../Layout/Settings";

const ProfileDisplay = ({ profile, setTab, tab }) => {
  const { user } = useSelector((state) => state.user);
  const [buttonText, setButtonText] = useState("");
  const [friendsWithUser, setFriendsWithUser] = useState(false);
  const [commonFriends, setCommonFriends] = useState([]);
  const [imageModalContent, setImageModalContent] = useState(null);
  const [value, setValue] = useToggle(false);
  const [edit, toggleEdit] = useToggle(false);
  const [imageModal, toggleImageModal] = useToggle(false);
  const [settings, toggleSettings] = useToggle(false);
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
      {settings && <Settings display={settings} setDisplay={toggleSettings} />}
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
      <div className="mobile-position">
        <ProfileTabs setTab={setTab} tab={tab} />
      </div>
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
          <div>
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
          </div>

          <div className="desktop-position">
            <ProfileTabs setTab={setTab} tab={tab} />
          </div>
          <div className="user-interactions">
            <div
              className="user-action-button"
              onClick={
                buttonText === ADD || buttonText === EDIT
                  ? handleAction
                  : setValue
              }
            >
              {buttonText}
            </div>
            {buttonText === EDIT && (
              <FiSettings onClick={toggleSettings} className="settings-icon" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
