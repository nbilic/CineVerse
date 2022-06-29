import "../../styles/movieCard.css";
import { useNavigate } from "react-router-dom";
const POSTER_PATH = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const BACKDROP_PATH =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";
const DEFAULT_POSTER = "https://www.movienewz.com/img/films/poster-holder.jpg";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-card-container">
      <div className="movie-card-upper">
        <img
          src={
            movie.poster_path
              ? `${POSTER_PATH}${movie.poster_path}`
              : DEFAULT_POSTER
          }
          alt=""
          className="movie-poster"
          onClick={() => navigate(`/movies/${movie.id}`)}
        />
      </div>
      <div className="movie-card-bottom">
        <div className="movie-rating">
          <span>{Math.round(+movie.vote_average * 10)}%</span>
        </div>
        <h5 onClick={() => navigate(`/movies/${movie.id}`)}>{movie.title}</h5>
        <p>{new Date(movie.release_date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default MovieCard;
