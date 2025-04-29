const MovieSchedule = require("../models/MovieSchedule");
const Movie = require("../models/MoviesModel");
const Theater = require("../models/TheatersModel");

// Tạo lịch chiếu mới
const CreateMovieSchedule = async (scheduleData) => {
  try {
    const { movie, theater, startDate, endDate } = scheduleData;

    const foundMovie = await Movie.findById(movie);
    const foundTheater = await Theater.findById(theater);

    if (!foundMovie || !foundTheater) {
      throw { status: "ERR", message: "Movie hoặc Theater không tồn tại" };
    }

    const schedule = await MovieSchedule.create({
      movie,
      theater,
      startDate,
      endDate,
    });

    return {
      status: "OK",
      message: "Tạo lịch chiếu thành công",
      data: schedule,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy toàn bộ lịch chiếu
const GetAllSchedules = async () => {
  try {
    const schedules = await MovieSchedule.find()
      .populate("movie")
      .populate("theater");

    return {
      status: "OK",
      message: "Lấy danh sách lịch chiếu thành công",
      data: schedules,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy lịch chiếu theo ID
const GetScheduleById = async (id) => {
  try {
    const schedule = await MovieSchedule.findById(id)
      .populate("movie")
      .populate("theater");

    if (!schedule) {
      throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
    }

    return {
      status: "OK",
      message: "Lấy lịch chiếu thành công",
      data: schedule,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Cập nhật lịch chiếu
const UpdateSchedule = async (id, updateData) => {
  try {
    const updated = await MovieSchedule.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      throw { status: "ERR", message: "Không tìm thấy lịch chiếu" };
    }

    return {
      status: "OK",
      message: "Cập nhật lịch chiếu thành công",
      data: updated,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Xoá lịch chiếu
const DeleteScheduleById = async (id) => {
  try {
    const found = await MovieSchedule.findById(id);
    if (!found) {
      throw { status: "ERR", message: "Không tìm thấy lịch chiếu" };
    }

    await MovieSchedule.deleteOne({ _id: id });

    return {
      status: "OK",
      message: `Xoá lịch chiếu thành công`,
      data: found,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy danh sách Movies + các Theater đang chiếu
const getMoviesWithTheaters = async () => {
  try {
    const schedules = await MovieSchedule.find()
      .populate("movie")
      .populate("theater");

    const movieMap = {};

    schedules.forEach((s) => {
      const movieId = s.movie._id;
      if (!movieMap[movieId]) {
        movieMap[movieId] = { movie: s.movie, theaters: [] };
      }

      if (
        !movieMap[movieId].theaters.find(
          (t) => t._id.toString() === s.theater._id.toString()
        )
      ) {
        movieMap[movieId].theaters.push(s.theater);
      }
    });

    return {
      status: "OK",
      message: "Lấy danh sách phim kèm rạp thành công",
      data: Object.values(movieMap),
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy danh sách Theaters + các Movie đang chiếu
const getTheatersWithMovies = async () => {
  try {
    const schedules = await MovieSchedule.find()
      .populate("movie")
      .populate("theater");

    const theaterMap = {};

    schedules.forEach((s) => {
      const theaterId = s.theater._id;
      if (!theaterMap[theaterId]) {
        theaterMap[theaterId] = { theater: s.theater, movies: [] };
      }

      if (
        !theaterMap[theaterId].movies.find(
          (m) => m._id.toString() === s.movie._id.toString()
        )
      ) {
        theaterMap[theaterId].movies.push(s.movie);
      }
    });

    return {
      status: "OK",
      message: "Lấy danh sách rạp kèm phim thành công",
      data: Object.values(theaterMap),
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy rạp theo movieId
const getTheatersByMovieId = async (movieId) => {
  try {
    const schedules = await MovieSchedule.find({ movie: movieId }).populate(
      "theater"
    );

    const theaters = schedules.map((s) => s.theater);

    const unique = [
      ...new Map(theaters.map((t) => [t._id.toString(), t])).values(),
    ];

    return {
      status: "OK",
      message: "Lấy danh sách rạp theo movie thành công",
      data: unique,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

// Lấy movie theo theaterId
const getMoviesByTheaterId = async (theaterId) => {
  try {
    const schedules = await MovieSchedule.find({ theater: theaterId }).populate(
      "movie"
    );

    const movies = schedules.map((s) => s.movie);

    const unique = [
      ...new Map(movies.map((m) => [m._id.toString(), m])).values(),
    ];

    return {
      status: "OK",
      message: "Lấy danh sách phim theo rạp thành công",
      data: unique,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

module.exports = {
  CreateMovieSchedule,
  GetAllSchedules,
  GetScheduleById,
  UpdateSchedule,
  DeleteScheduleById,
  getMoviesWithTheaters,
  getTheatersWithMovies,
  getTheatersByMovieId,
  getMoviesByTheaterId,
};
