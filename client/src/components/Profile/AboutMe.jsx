import "../../styles/aboutMe.css";

const AboutMe = () => {
  return (
    <div className="about-me">
      <div className="left-side">
        <div className="pair">
          <h5>Name: </h5>
          <p>Nikola Bilić</p>
        </div>
        <div className="pair">
          <h5>Age: </h5>
          <p>26</p>
        </div>
        <div className="pair">
          <h5>Location: </h5>
          <p>Split, Croatia</p>
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            corrupti earum porro optio possimus quod iure est! Ducimus incidunt
            ex accusamus sunt, iure quibusdam reiciendis dolorem accusantium
            numquam reprehenderit nostrum.
          </p>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default AboutMe;
