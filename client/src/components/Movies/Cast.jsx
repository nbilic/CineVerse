import { useEffect } from "react";
import Actor from "./Actor";

const Cast = ({ cast }) => {
  useEffect(() => {
    console.log(cast);
  }, []);
  return (
    <div className="cast-container">
      <h4>Top Billed Cast</h4>
      <div className="cast">
        {cast?.map((actor) => (
          <Actor key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default Cast;
