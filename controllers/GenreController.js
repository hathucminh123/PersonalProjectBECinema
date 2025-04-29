const Genre = require("../Services/Genre");

const createGenre = async (req, res) => {
  try {
    const genreData = req.body;
    const result = await Genre.createGenre(genreData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const result = await Genre.getAllGenres();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;
    const result = await Genre.getGenreById(genreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genreData = req.body;
    const result = await Genre.updateGenre(genreId, genreData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const result = await Genre.deleteGenre(genreId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};
const getGenreByName = async (req, res) => {
  try {
    const genreName = req.params.name;
    const result = await Genre.getGenreByName(genreName);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: "ERR", message: error.message });
  }
};

module.exports = {
  createGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
  getGenreByName,
};
