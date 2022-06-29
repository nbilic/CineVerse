import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Layout/Navbar";
import MovieCard from "../components/Movies/MovieCard";
import "../styles/searchMovie.css";
const SearchMovies = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/movie/name", {
        params: { name: input },
      });
      setMovies(response.data);
    } catch (error) {
      console.log(error?.message);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getMovies();
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="search-movies-container">
      <Navbar />
      <div className="searchbar">
        <h4>Enter movie name:</h4>
        <input
          type="text"
          className="movie-search-input"
          placeholder="Batman..."
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="movies">
        {Array.isArray(movies) &&
          movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default SearchMovies;
