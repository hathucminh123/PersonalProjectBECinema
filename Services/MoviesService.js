const Movies = require("../models/MoviesModel");

// Tạo mới một movie
const CreateMovie = async (newMovieData) => {
  try {
    const {
      title,
      description,
      duration,
      director,
      actors,
      releaseDate,
      endDate,
      trailerUrl,
      posterUrl,
    } = newMovieData;

    const movie = await Movies.create({
      title,
      description,
      duration,
      director,
      actors,
      releaseDate,
      endDate,
      trailerUrl,
      posterUrl,
    });

    return {
      status: "OK",
      message: "Tạo Movie thành công",
      data: movie,
    };
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

// Lấy tất cả movies
const getMovies = async () => {
  try {
    const moviesList = await Movies.find();
    return {
      status: "OK",
      message: "Success",
      data: moviesList,
    };
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

// Lấy movie theo ID
const GetMoviesById = async (id) => {
  try {
    const movie = await Movies.findById(id);
    if (movie) {
      return {
        status: "OK",
        message: "Success",
        data: movie,
      };
    } else {
      throw {
        status: "ERR",
        message: "Movie not found",
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

// Cập nhật movie
const UpdateMovie = async (id, updateData) => {
  try {
    const updatedMovie = await Movies.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (updatedMovie) {
      return {
        status: "OK",
        message: "Cập nhật Movie thành công",
        data: updatedMovie,
      };
    } else {
      throw {
        status: "ERR",
        message: "Movie không tồn tại",
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

// Xoá movie theo ID
const DeleteMoviesById = async (id) => {
  try {
    const movie = await Movies.findById(id);
    if (movie) {
      await Movies.deleteOne({ _id: id });
      return {
        status: "OK",
        message: `Xoá Movie "${movie.title}" thành công`,
        data: movie,
      };
    } else {
      throw {
        status: "ERR",
        message: "Movie không tồn tại",
      };
    }
  } catch (err) {
    throw {
      status: "ERR",
      message: err.message,
    };
  }
};

// Export module
module.exports = {
  CreateMovie,
  getMovies,
  GetMoviesById,
  UpdateMovie,
  DeleteMoviesById,
};
