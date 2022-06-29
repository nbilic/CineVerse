import api from "../../api/api";
import "../../styles/trendingMovies.css";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import RotateLoader from "react-spinners/RotateLoader";
const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [trendingType, setTrendingType] = useState("TODAY");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getTrending = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/movie/trending", {
          params: { type: trendingType === "TODAY" ? "day" : "week" },
        });
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getTrending();
  }, [trendingType]);
  return (
    <div className="trending-movies-container">
      <h3>
        Trending
        <div className="trending-buttons">
          <button
            className={`trending-button today ${
              trendingType === "TODAY" && "active"
            }`}
            onClick={() => setTrendingType("TODAY")}
          >
            Today
          </button>{" "}
          <button
            className={`trending-button ${
              trendingType === "THIS WEEK" && "active"
            }`}
            onClick={() => setTrendingType("THIS WEEK")}
          >
            This week
          </button>{" "}
        </div>
      </h3>
      {/*  {loading && (
        <div className="loader-container">
          <RotateLoader
            color="lightblue"
            size={10}
            loading={loading}
            margin="2"
          />
        </div>
      )} */}
      {
        <div className="movies">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      }
    </div>
  );
};

export default TrendingMovies;
