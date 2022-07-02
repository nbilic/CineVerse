import Navbar from "../components/Layout/Navbar";
import MovieDetailed from "../components/Movies/MovieDetailed";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import api from "../api/api";
import Cast from "../components/Movies/Cast";

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMovieById = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/movie/${id}`);
        setMovie(response.data.movie);
        setCast(response.data.cast.cast.slice(0, 15));
        console.log(response.data.cast.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getMovieById();
  }, [id]);
  return (
    <div>
      <Navbar />

      <div className="center grid-item movie-item">
        {movie && <MovieDetailed movie={movie} />}
        {cast && <Cast cast={cast} />}
      </div>
    </div>
  );
};

export default SingleMovie;
