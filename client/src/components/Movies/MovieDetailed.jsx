import "../../styles/movieDetailed.css";

import { toast } from "react-toastify";

import api from "../../api/api";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { FaHeartBroken } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
const POSTER_PATH = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const BACKDROP_PATH =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";

const MovieDetailed = ({ movie }) => {
  const notify = (input) => toast.success(input, {});
  const { user } = useSelector((state) => state.user);
  const [watched, setWatched] = useState(false);
  const handleRating = async (rating) => {
    try {
      await api.put("/api/user/addmovie", {
        userId: user._id,
        movieId: movie.id,
        rating: rating,
      });

      !watched && notify("MOVIE ADDED TO COLLECTION");
      watched && notify("MOVIE RATING UPDATED");
      !watched && setWatched(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeMovie = async () => {
    try {
      await api.delete(`/api/user/removemovie/${movie.id}`, {
        params: { user: user._id },
      });
      setWatched(false);
      notify("MOVIE REMOVED FROM COLLECTION");
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const checkIfWatched = async () => {
      try {
        const response = await api.get(`/api/user/watched/${movie.id}`, {
          params: { user: user._id },
        });
        setWatched(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    checkIfWatched();
  }, []);
  return (
    <div className="single-movie-container">
      <div className="backdrop-shadow" />
      <img
        src={`${BACKDROP_PATH}${movie?.backdrop_path}`}
        alt=""
        className="movie-backdrop"
      />
      <div className="movie-container-content">
        <img
          src={`${POSTER_PATH}${movie?.poster_path}`}
          alt=""
          className="single-movie-poster"
        />
        <div className="movie-details">
          <div className="layer-1">
            <h4>{movie?.title}</h4>
            <h5 className="release-year">
              ({movie?.release_date.split("-")[0]})
            </h5>
          </div>

          <div className="layer-2">
            <p>
              {new Date(
                movie?.release_date.replaceAll("-", "/")
              ).toLocaleDateString()}
            </p>
            <p>
              {movie?.genres?.map(
                (genre, index) =>
                  `${genre.name}${index < movie?.genres.length - 1 ? "," : ""} `
              )}
            </p>
            <p>{movie?.runtime}min</p>
          </div>

          <div className="layer-3">
            <div className="user-score-outline"></div>
            <div className="user-score">
              {Math.round(+movie.vote_average / 2)}/5
            </div>
            <h5>User Score</h5>
            <div className="movie-dropdown-menu">
              <AiFillHeart className="like-icon" />
              <div className="movie-dropdown-content">
                <ul className="movie-dropdown">
                  <li onClick={() => handleRating(1)}>
                    <AiFillStar className="star" />1
                  </li>
                  <li onClick={() => handleRating(2)}>
                    <AiFillStar className="star" /> 2
                  </li>
                  <li onClick={() => handleRating(3)}>
                    <AiFillStar className="star" /> 3
                  </li>
                  <li onClick={() => handleRating(4)}>
                    <AiFillStar className="star" /> 4
                  </li>
                  <li onClick={() => handleRating(5)}>
                    <AiFillStar className="star" /> 5
                  </li>
                </ul>
              </div>
            </div>
            {watched && (
              <FaHeartBroken className="dislike-icon" onClick={removeMovie} />
            )}
          </div>
          <div className="layer-4">
            <p className="tagline">{movie?.tagline}</p>
            <div className="overview">
              <h4>Overview</h4>
              <p>{movie?.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailed;
