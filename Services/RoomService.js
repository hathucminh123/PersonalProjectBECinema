const Room = require("../models/RoomsModel");
const Theater = require("../models/TheatersModel");

const createRoom = async (data) => {
  try {
    const { theater, name, total_seats } = data;

    const foundTheater = await Theater.findById(theater);
    if (!foundTheater) {
      throw { status: "ERR", message: "Rạp không tồn tại" };
    }

    const room = await Room.create({ theater, name, total_seats });

    return {
      status: "OK",
      message: "Tạo phòng chiếu thành công",
      data: room,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const getAllRooms = async () => {
  try {
    const rooms = await Room.find().populate("theater");
    return {
      status: "OK",
      message: "Lấy danh sách phòng chiếu thành công",
      data: rooms,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const getRoomsByTheaterId = async (theaterId) => {
  try {
    const rooms = await Room.find({ theater: theaterId });
    return {
      status: "OK",
      message: "Lấy phòng chiếu theo rạp thành công",
      data: rooms,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const updateRoom = async (roomId, updateData) => {
  try {
    const updated = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    if (!updated) throw { status: "ERR", message: "Không tìm thấy phòng để cập nhật" };

    return {
      status: "OK",
      message: "Cập nhật phòng chiếu thành công",
      data: updated,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const deleteRoom = async (roomId) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) throw { status: "ERR", message: "Phòng không tồn tại" };

    await Room.findByIdAndDelete(roomId);

    return {
      status: "OK",
      message: "Xoá phòng chiếu thành công",
      data: room,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomsByTheaterId,
  updateRoom,
  deleteRoom,
};
