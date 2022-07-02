const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");
const Movie = require("../models/movie");
const API_KEY = "58e6eb6950d2e03556ac2af37dd40921";
const URL = "https://api.themoviedb.org/3";

const getUpcoming = async () => {
  try {
    const res = await axios.get(`${URL}/movie/upcoming?api_key=${API_KEY}`);
    return res.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const getTrending = async (type) => {
  try {
    const res = await axios.get(
      `${URL}/trending/movie/${type}?api_key=${API_KEY}`
    );
    return res.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const getMovieById = async (id) => {
  try {
    const res = await axios.get(`${URL}/movie/${id}?api_key=${API_KEY}`);
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const getCastByMovieId = async (id) => {
  try {
    const res = await axios.get(
      `${URL}/movie/${id}/credits?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

const getMovieByName = async (name) => {
  try {
    const res = await axios.get(
      `${URL}/search/movie/?api_key=${API_KEY}&query=${name}`
    );
    return res.data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const getGenres = async () => {
  try {
    const res = await axios.get(`${URL}/genre/movie/list?api_key=${API_KEY}`);
    return res.data.genres;
  } catch (error) {
    console.log(error.message);
  }
};

const getListOfMovies = async (movies) => {
  try {
    const res = await Promise.all(
      await movies.map(async (m) => await getMovieById(m))
    );

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

// Get list of movies
router.get("/movielist", async (req, res) => {
  try {
    const listOfMovies = await getListOfMovies(req.query.list);

    res.status(200).json(listOfMovies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});
// Get all movies from user
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const userMovies = await Promise.all(
      user.movies.map(async (movie) => {
        const movieDB = await Movie.findById(movie);
        const movieFromAPI = await getMovieById(movieDB.id);

        return { ...movieFromAPI, rating: movieDB.rating };
      })
    );

    res.status(200).json(userMovies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

// Get all genres
router.get("/genres", async (req, res) => {
  try {
    const genres = await getGenres();
    res.status(200).json(genres);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get trending movies
router.get("/trending", async (req, res) => {
  try {
    const movies = await getTrending(req.query.type);
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get upcoming movies
router.get("/upcoming", async (req, res) => {
  try {
    const movies = await getUpcoming();
    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get movie by name
router.get("/name", async (req, res) => {
  try {
    console.log(req.query);
    const movie = await getMovieByName(req.query.name);
    res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Get movie by id
router.get("/:id", async (req, res) => {
  try {
    const movie = await getMovieById(req.params.id);
    const cast = await getCastByMovieId(req.params.id);
    res.status(200).json({ movie: movie, cast: cast });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
