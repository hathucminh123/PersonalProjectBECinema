const MovieScheduleService = require("../Services/MovieScheduleService");

// Tạo lịch chiếu mới
const createSchedule = async (req, res) => {
  try {
    const response = await MovieScheduleService.CreateMovieSchedule(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy tất cả lịch chiếu
const getAllSchedules = async (req, res) => {
  try {
    const response = await MovieScheduleService.GetAllSchedules();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy lịch chiếu theo ID
const getScheduleById = async (req, res) => {
  try {
    const response = await MovieScheduleService.GetScheduleById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Cập nhật lịch chiếu
const updateSchedule = async (req, res) => {
  try {
    const response = await MovieScheduleService.UpdateSchedule(req.params.id, req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Xoá lịch chiếu
const deleteSchedule = async (req, res) => {
  try {
    const response = await MovieScheduleService.DeleteScheduleById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy danh sách phim kèm rạp chiếu
const getMoviesWithTheaters = async (req, res) => {
  try {
    const response = await MovieScheduleService.getMoviesWithTheaters();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy danh sách rạp kèm phim chiếu
const getTheatersWithMovies = async (req, res) => {
  try {
    const response = await MovieScheduleService.getTheatersWithMovies();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy danh sách phim theo rạp ID
const getMoviesByTheaterId = async (req, res) => {
  try {
    const response = await MovieScheduleService.getMoviesByTheaterId(req.params.theaterId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Lấy danh sách rạp theo phim ID
const getTheatersByMovieId = async (req, res) => {
  try {
    const response = await MovieScheduleService.getTheatersByMovieId(req.params.movieId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
  getMoviesWithTheaters,
  getTheatersWithMovies,
  getMoviesByTheaterId,
  getTheatersByMovieId,
};
