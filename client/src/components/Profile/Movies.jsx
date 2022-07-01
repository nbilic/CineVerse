import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import MovieCard from "../Movies/MovieCard";
import "../../styles/movies.css";
import RotateLoader from "react-spinners/RotateLoader";

const Movies = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectValue, setSelectValue] = useState("HMM");
  const [filters, setFilters] = useState([]);
  const [currentFilterValue, setCurrentFilterValue] =
    useState("Select a category");

  const handleChange = (e) => {
    if (e.target.value === "") {
    }
    const isFiltered = filters.find((x) => x === e.target.value);
    !isFiltered && setFilters([...filters, e.target.value]);
  };

  const removeFilter = (y) => setFilters(filters.filter((x) => x !== y));

  useEffect(() => {
    setMovies(
      originalMovieList.filter((movie) => {
        let flag = true;
        filters.forEach((filter) => {
          const genreExists = movie.genres.find((x) => x.name === filter);
          if (!genreExists) flag = false;
        });
        if (flag) return movie;
      })
    );

    !filters.length && setMovies(originalMovieList);
  }, [filters]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await api.get("/api/movie/genres");
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserMovies = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/movie/user/${user._id}`);
        setOriginalMovieList(response.data);
        setMovies(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
    getUserMovies();
  }, []);
  return (
    <div className="movies-tab">
      {/*  <div className="tab-buttons">
        <button className="filter-button">WATCHED</button>
        <button className="filter-button">WATCH LATER</button>
      </div> */}

      <div className="filter-by-genre">
        <form>
          <label>
            <h4>FILTER BY GENRE:</h4>
          </label>
          <select
            name="genres"
            onChange={handleChange}
            value={currentFilterValue}
          >
            <option value="">Select a category</option>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </form>
        {loading && (
          <div className="loader-container">
            <RotateLoader color="lightblue" size={10} loading={loading} />
          </div>
        )}
        <div className="filters-row">
          {filters.map((filter, i) => (
            <p
              key={i}
              className="filter-option"
              onClick={() => removeFilter(filter)}
            >
              {filter}
            </p>
          ))}
        </div>
      </div>
      <div className="movies">
        {movies?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
