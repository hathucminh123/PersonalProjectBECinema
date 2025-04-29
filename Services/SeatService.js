const Seat = require("../models/SeatsModel");
const Room = require("../models/RoomsModel");

const createSeat = async (data) => {
  try {
    const { room, seat_number, seat_type } = data;

    const foundRoom = await Room.findById(room);
    if (!foundRoom) throw { status: "ERR", message: "Phòng không tồn tại" };

    const seat = await Seat.create({ room, seat_number, seat_type });

    return {
      status: "OK",
      message: "Tạo ghế thành công",
      data: seat,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const getAllSeats = async () => {
  try {
    const seats = await Seat.find().populate("room");

    return {
      status: "OK",
      message: "Lấy danh sách ghế thành công",
      data: seats,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const getSeatsByRoomId = async (roomId) => {
  try {
    const seats = await Seat.find({ room: roomId });

    return {
      status: "OK",
      message: "Lấy danh sách ghế theo phòng thành công",
      data: seats,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const updateSeat = async (seatId, updateData) => {
  try {
    const updated = await Seat.findByIdAndUpdate(seatId, updateData, { new: true });
    if (!updated) throw { status: "ERR", message: "Không tìm thấy ghế để cập nhật" };

    return {
      status: "OK",
      message: "Cập nhật ghế thành công",
      data: updated,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

const deleteSeat = async (seatId) => {
  try {
    const seat = await Seat.findById(seatId);
    if (!seat) throw { status: "ERR", message: "Ghế không tồn tại" };

    await Seat.findByIdAndDelete(seatId);

    return {
      status: "OK",
      message: "Xoá ghế thành công",
      data: seat,
    };
  } catch (err) {
    throw { status: "ERR", message: err.message };
  }
};

module.exports = {
  createSeat,
  getAllSeats,
  getSeatsByRoomId,
  updateSeat,
  deleteSeat,
};
