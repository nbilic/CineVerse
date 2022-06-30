import "../../styles/aboutMe.css";

const AboutMe = ({ user }) => {
  return (
    <div className="about-me">
      <div className="left-side">
        <div className="pair">
          <h5>Name: </h5>
          <p>{user.fullName}</p>
        </div>
        <div className="pair">
          <h5>Age: </h5>
          <p>26</p>
        </div>
        <div className="pair">
          <h5>Location: </h5>
          <p>{user.location}</p>
        </div>
        <div className="pair">
          <h5>Favorite movie:</h5>
          <p>Morbius</p>
        </div>
        <div className="pair">
          <h5>Favorite genres:</h5>
          <p>Adventure, Fantasy</p>
        </div>
      </div>
      <div className="right-side">
        <div className="pair">
          <h5>About me: </h5>
          <p>{user.bio || "N/A"}</p>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default AboutMe;
