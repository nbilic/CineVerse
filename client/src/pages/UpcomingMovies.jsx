import api from "../api/api";
import "../styles/trendingMovies.css";
import { useState, useEffect } from "react";
import MovieCard from "../components/Movies/MovieCard";
import RotateLoader from "react-spinners/RotateLoader";
import Navbar from "../components/Layout/Navbar";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUpcoming = async () => {
      try {
        setLoading(true);
        const response = await api.get("api/movie/upcoming");
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUpcoming();
  }, []);
  return (
    <div>
      <Navbar />

      <div className="trending-movies-container">
        <h3>Upcoming movies</h3>
        {loading && (
          <div className="loader-container">
            <RotateLoader
              color="lightblue"
              size={10}
              loading={loading}
              margin="2"
            />
          </div>
        )}
        {
          <div className="movies">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default UpcomingMovies;
