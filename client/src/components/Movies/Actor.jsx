import "../../styles/actor.css";

const ACTOR_PATH = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const NO_IMAGE =
  "https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU=";
const Actor = ({ actor }) => {
  return (
    <div className="actor-card">
      <img
        src={
          actor?.profile_path ? `${ACTOR_PATH}${actor?.profile_path}` : NO_IMAGE
        }
        alt=""
        className={`actor-image ${!actor.profile_path && "default"}`}
      />

      <h4>{actor.original_name}</h4>
      <h5>{actor.character}</h5>
    </div>
  );
};

export default Actor;
