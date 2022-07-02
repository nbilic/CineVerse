import { useNavigate } from "react-router-dom";
const POSTER_PATH = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const DEFAULT_POSTER = "https://www.movienewz.com/img/films/poster-holder.jpg";

const MovieMiniature = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="mini-movie-card">
      <img
        src={
          movie.poster_path
            ? `${POSTER_PATH}${movie.poster_path}`
            : DEFAULT_POSTER
        }
        alt=""
        className="mini-movie-poster"
        onClick={() => navigate(`/movies/${movie.id}`)}
      />
      <h5 onClick={() => navigate(`/movies/${movie.id}`)}>{movie.title}</h5>
      {/*  <p className="mini-movie-release-date">
        {new Date(movie.release_date).toLocaleDateString()}
      </p> */}
    </div>
  );
};

export default MovieMiniature;
