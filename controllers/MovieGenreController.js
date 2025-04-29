const MovieGenreService = require("../services/MovieGenre");

const createMovieGenre = async (req, res) => {
  try {
    const movieGenreData = req.body;
    const result = await MovieGenreService.createMovieGenre(movieGenreData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getAllMovieGenres = async (req, res) => {
  try {
    const result = await MovieGenreService.getAllMovieGenres();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getMovieGenreById = async (req, res) => {
  try {
    const movieGenreId = req.params.id;
    const result = await MovieGenreService.getMovieGenreById(movieGenreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const updateMovieGenre = async (req, res) => {
  try {
    const movieGenreId = req.params.id;
    const movieGenreData = req.body;
    const result = await MovieGenreService.updateMovieGenre(
      movieGenreId,
      movieGenreData
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const deleteMovieGenre = async (req, res) => {
  try {
    const movieGenreId = req.params.id;
    const result = await MovieGenreService.deleteMovieGenre(movieGenreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getMovieGenreByMovieId = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const result = await MovieGenreService.getMovieGenreByMovieId(movieId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getMovieGenreByGenreId = async (req, res) => {
  try {
    const genreId = req.params.genreId;
    const result = await MovieGenreService.getMovieGenreByGenreId(genreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
module.exports = {
  createMovieGenre,
  getAllMovieGenres,
  getMovieGenreById,
  updateMovieGenre,
  deleteMovieGenre,
  getMovieGenreByMovieId,
  getMovieGenreByGenreId,
};
