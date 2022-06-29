import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/api";
import "../../styles/movies.css";
const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectValue, setSelectValue] = useState("HMM");
  const [filters, setFilters] = useState([]);

  const handleChange = (e) => {
    const isFiltered = filters.find((x) => x === e.target.value);
    !isFiltered && setFilters([...filters, e.target.value]);
  };

  const removeFilter = (y) => setFilters(filters.filter((x) => x !== y));

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await api.get("/api/movie/genres");
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);
  return (
    <div className="movies-tab">
      <div className="tab-buttons">
        <button className="filter-button">WATCHED</button>
        <button className="filter-button">WATCH LATER</button>
      </div>
      <div className="filter-by-genre">
        <form>
          <label>
            <h4>FILTER BY GENRE:</h4>
          </label>
          <select name="genres" onChange={handleChange}>
            {genres?.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </form>
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
    </div>
  );
};

export default Movies;
