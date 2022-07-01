import "../../styles/aboutMe.css";

const AboutMe = ({ user }) => {
  function calcAge(dateString = user.dob) {
    const birthday = +new Date(dateString);

    return ~~((Date.now() - birthday) / 31557600000);
  }
  return (
    <div className="about-me">
      <div className="left-side">
        <div className="pair">
          <h5>Name: </h5>
          <p>{user.fullName}</p>
        </div>
        <div className="pair">
          <h5>Age: </h5>
          <p>{calcAge() || "N/A"}</p>
        </div>
        <div className="pair">
          <h5>Location: </h5>
          <p>{user.location}</p>
        </div>
        <div className="pair">
          <h5>Favorite movie:</h5>
          <p>{user.favoriteMovie || "N/A"}</p>
        </div>
        <div className="pair">
          <h5>Favorite genres:</h5>
          <p>{user.favoriteGenres || "N/A"}</p>
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
