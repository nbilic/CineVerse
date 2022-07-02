import MovieCard from "./MovieCard";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useRef } from "react";
import { disableScroll, enableScroll } from "../../functions/modifyScroll";
import MovieMiniature from "./MovieMiniature";
const MovieReleasesModal = ({ movieList, setDisplay }) => {
  const ref = useRef();
  /*   useEffect(() => {
    if (display) disableScroll();
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target))
        setDisplay(false);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      enableScroll();
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display, setDisplay]); */

  if (!movieList.length) return "";
  return (
    <div>
      <h4 className="modal-date">
        {movieList[0]?.release_date.replaceAll("-", "/")}
        <AiOutlineClose
          onClick={() => setDisplay(false)}
          className="close-modal"
        />
      </h4>

      <div className="movie-modal">
        {movieList.map((movie) => (
          <MovieMiniature key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieReleasesModal;
