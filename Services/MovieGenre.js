const MovieGenre = require("../models/MovieGenre");
const Movie = require("../models/MoviesModel");
const Genre = require("../models/Genre");

const createMovieGenre = async (movieGenreData) => {
  try {
    const { movie, genre } = movieGenreData;
    const existingMovieGenre = await MovieGenre.findOne({ movie, genre });
    if (existingMovieGenre) {
      return {
        status: "ERR",
        message: "MovieGenre đã tồn tại",
      };
    }
    const newMovieGenre = await MovieGenre.create({
      movie,
      genre,
    });
    return {
      status: "OK",
      message: "Tạo MovieGenre thành công",
      data: newMovieGenre,
    };
  } catch (error) {
    throw new Error("Error creating MovieGenre: " + error.message);
  }
};

const getAllMovieGenres = async () => {
  try {
    const movieGenres = await MovieGenre.find()
      .populate("movie")
      .populate("genre");
    return {
      status: "OK",
      message: "Lấy danh sách MovieGenres thành công",
      data: movieGenres,
    };
  } catch (error) {
    throw new Error("Error fetching MovieGenres: " + error.message);
  }
};
const getMovieGenreById = async (id) => {
  try {
    const movieGenre = await MovieGenre.findById(id)
      .populate("movie")
      .populate("genre");
    if (!movieGenre) {
      return {
        status: "ERR",
        message: "MovieGenre không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Lấy MovieGenre thành công",
      data: movieGenre,
    };
  } catch (error) {
    throw new Error("Error fetching MovieGenre: " + error.message);
  }
};
const updateMovieGenre = async (id, data) => {
  try {
    const { movie, genre } = data;
    const existingMovieGenre = await MovieGenre.findById(id);
    if (!existingMovieGenre) {
      return {
        status: "ERR",
        message: "MovieGenre không tồn tại",
      };
    }
    const updatedMovieGenre = await MovieGenre.findByIdAndUpdate(
      id,
      { movie, genre },
      { new: true }
    );
    return {
      status: "OK",
      message: "Cập nhật MovieGenre thành công",
      data: updatedMovieGenre,
    };
  } catch (error) {
    throw new Error("Error updating MovieGenre: " + error.message);
  }
};
const deleteMovieGenre = async (id) => {
  try {
    const movieGenre = await MovieGenre.findById(id);
    if (!movieGenre) {
      return {
        status: "ERR",
        message: "MovieGenre không tồn tại",
      };
    }
    await MovieGenre.findByIdAndDelete(id);
    return {
      status: "OK",
      message: "Xóa MovieGenre thành công",
    };
  } catch (error) {
    throw new Error("Error deleting MovieGenre: " + error.message);
  }
};
const getMovieGenreByMovieId = async (movieId) => {
  try {
    const movieGenres = await MovieGenre.find({ movie: movieId })
      .populate("movie")
      .populate("genre");
    if (!movieGenres) {
      return {
        status: "ERR",
        message: "MovieGenre không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Lấy MovieGenre thành công",
      data: movieGenres,
    };
  } catch (error) {
    throw new Error("Error fetching MovieGenre: " + error.message);
  }
};
const getMovieGenreByGenreId = async (genreId) => {
  try {
    const movieGenres = await MovieGenre.find({ genre: genreId })
      .populate("movie")
      .populate("genre");
    if (!movieGenres) {
      return {
        status: "ERR",
        message: "MovieGenre không tồn tại",
      };
    }
    return {
      status: "OK",
      message: "Lấy MovieGenre thành công",
      data: movieGenres,
    };
  } catch (error) {
    throw new Error("Error fetching MovieGenre: " + error.message);
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
// };
