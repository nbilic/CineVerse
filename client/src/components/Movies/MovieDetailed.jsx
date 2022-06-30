import "../../styles/movieDetailed.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../../api/api";
import { useState } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
const POSTER_PATH = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const BACKDROP_PATH =
  "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";

const MovieDetailed = ({ movie }) => {
  const { user } = useSelector((state) => state.user);
  const handleRating = async (rating) => {
    try {
      const response = await api.put("/api/user/addmovie", {
        userId: user._id,
        movieId: movie.id,
        rating: rating,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
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
              {Math.round(movie?.vote_average * 10)}
            </div>
            <h5>User Score</h5>
            <div className="movie-dropdown-menu">
              <AiFillHeart className="like-icon" />
              <div className="movie-dropdown-content">
                <ul className="movie-dropdown">
                  <li>
                    <AiFillStar
                      className="star"
                      onClick={() => handleRating(1)}
                    />
                    1
                  </li>
                  <li>
                    <AiFillStar
                      className="star"
                      onClick={() => handleRating(2)}
                    />{" "}
                    2
                  </li>
                  <li>
                    <AiFillStar
                      className="star"
                      onClick={() => handleRating(3)}
                    />{" "}
                    3
                  </li>
                  <li>
                    <AiFillStar
                      className="star"
                      onClick={() => handleRating(4)}
                    />{" "}
                    4
                  </li>
                  <li>
                    <AiFillStar
                      className="star"
                      onClick={() => handleRating(5)}
                    />{" "}
                    5
                  </li>
                </ul>
              </div>
            </div>
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
