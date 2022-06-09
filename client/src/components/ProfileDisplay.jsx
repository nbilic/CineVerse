import "../styles/profileDisplay.css";
import { GoLocation, GoCalendar } from "react-icons/go";
import { AiOutlineLink } from "react-icons/ai";

const ProfileDisplay = ({ user }) => {
  return (
    <div className="profile-display-container">
      <div className="upper-container">
        <img src={user?.banner} alt="" className="banner" />
      </div>

      <div className="bottom-container">
        <img src={user?.avatar} alt="" className="profile-avatar" />
        <h5 className="profile-name">{`${user?.fullName}`}</h5>
        <p className="profile-handle">{`@${user?.handle}`}</p>
        <p className="profile-bio">{user?.bio}</p>
        <div className="profile-personal-info">
          {user?.location && (
            <div>
              <GoLocation /> <p>{user?.location}</p>
            </div>
          )}
          {user?.link && (
            <div>
              <AiOutlineLink />
              <p>{user?.link}</p>
            </div>
          )}
          <div>
            <GoCalendar />
            <p>Joined {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        {/*    <div className="profile-stats">
          <p className="stat">{user.friends?.length} Friends</p>
          <p className="stat">{user.posts?.length} Posts</p>
        </div> */}
        <div className="friends-incommon">You have no friends in common</div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
