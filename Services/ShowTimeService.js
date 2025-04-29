const ShowTime = require("../models/Showtimes");
const Movie = require("../models/MoviesModel");

const Rooms = require("../models/RoomsModel");

const getAllShowTimes = async () => {
  try {
    const showTimes = await ShowTime.find().populate("movie").populate("room");

    return {
      status: "OK",
      message: "Lấy danh sách lịch chiếu thành công",
      data: showTimes,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const createShowTime = async (showTimeData) => {
  try {
    const { movie, room, startTime, endTime, price } = showTimeData;

    const foundMovie = await Movie.findById(movie);
    const foundRoom = await Rooms.findById(room);
    if (!foundMovie || !foundRoom) {
      throw { status: "ERR", message: "Movie hoặc Room không tồn tại" };
    }
    const showTime = await ShowTime.create({
      movie,
      room,
      startTime,
      endTime,
      price,
    });
    return {
      status: "OK",
      message: "Tạo lịch chiếu thành công",
      data: showTime,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};
const getShowTimeById = async (id) => {
  try {
    const showTime = await ShowTime.findById(id)
      .populate("movie")
      .populate("room");

    if (!showTime) {
      throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
    }
    return {
      status: "OK",
      message: "Lấy lịch chiếu thành công",
      data: showTime,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};
const updateShowTime = async (id, showTimeData) => {
  try {
    const { movie, room, startTime, endTime, price } = showTimeData;

    const foundMovie = await Movie.findById(movie);
    const foundRoom = await Rooms.findById(room);
    if (!foundMovie || !foundRoom) {
      throw { status: "ERR", message: "Movie hoặc Room không tồn tại" };
    }
    const updatedShowTime = await ShowTime.findByIdAndUpdate(
      id,
      { movie, room, startTime, endTime, price },
      { new: true }
    )
      .populate("movie")
      .populate("room");

    if (!updatedShowTime) {
      throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
    }

    return {
      status: "OK",
      message: "Cập nhật lịch chiếu thành công",
      data: updatedShowTime,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};
const deleteShowTime = async (id) => {
  try {
    const deletedShowTime = await ShowTime.findByIdAndDelete(id);

    if (!deletedShowTime) {
      throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
    }

    return {
      status: "OK",
      message: "Xóa lịch chiếu thành công",
      data: deletedShowTime,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};
const getShowTimeByMovieId = async (movieId) => {
  try {
    const showTimes = await ShowTime.find({ movie: movieId })
      .populate("movie")
      .populate("room");
    if (!showTimes) {
      throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
    }
    return {
      status: "OK",
      message: "Lấy lịch chiếu thành công",
      data: showTimes,
    };
    }
    catch (err) {
        throw { status: "ERR", message: err.message };
        }
    }
const getShowTimeByRoomId = async (roomId) => {
    try {
        const showTimes = await ShowTime.find({ room: roomId })
        .populate("movie")
        .populate("room");
        if (!showTimes) {
        throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
        }
        return {
        status: "OK",
        message: "Lấy lịch chiếu thành công",
        data: showTimes,
        };
    } catch (err) {
        throw { status: "ERR", message: err.message };
    }
    }
// const getShowTimeByDate = async (date) => {
//     try {
//         const showTimes = await ShowTime.find({
//             startTime: { $gte: new Date(date) },
//             endTime: { $lte: new Date(date) },
//         })
//         .populate("movie")
//         .populate("room");
//         if (!showTimes) {
//         throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
//         }
//         return {
//         status: "OK",
//         message: "Lấy lịch chiếu thành công",
//         data: showTimes,
//         };
//     } catch (err) {
//         throw { status: "ERR", message: err.message };
//     }
//     }
// const getShowTimeByRoomAndDate = async (roomId, date) => {
//     try {
//         const showTimes = await ShowTime.find({
//             room: roomId,
//             startTime: { $gte: new Date(date) },
//             endTime: { $lte: new Date(date) },
//         })
//         .populate("movie")
//         .populate("room");
//         if (!showTimes) {
//         throw { status: "ERR", message: "Lịch chiếu không tồn tại" };
//         }
//         return {
//         status: "OK",
//         message: "Lấy lịch chiếu thành công",
//         data: showTimes,
//         };
//     } catch (err) {
//         throw { status: "ERR", message: err.message };
//     }
//     }


module.exports = {
    getAllShowTimes,
    createShowTime,
    getShowTimeById,
    updateShowTime,
    deleteShowTime,
    getShowTimeByMovieId,
    getShowTimeByRoomId,
    // getShowTimeByDate,
    // getShowTimeByRoomAndDate,
    };
