const Booking = require('../models/Booking');
const BookingDetail = require('../models/BookingDetailModel');
const ShowTime = require('../models/Showtimes');
const Seat = require('../models/SeatsModel');

const createBooking = async (bookingData, bookingDetailsData) => {
  try {
    const booking = new Booking(bookingData);
    await booking.save();

    // Tạo BookingDetail cho từng ghế
    const bookingDetails = await Promise.all(
      bookingDetailsData.map(async (detail) => {
        return await BookingDetail.create({
          booking: booking._id,
          seat: detail.seat,
          price: detail.price,
        });
      })
    );

    return {
      status: "OK",
      message: "Tạo booking thành công",
      data: {
        booking,
        bookingDetails,
      },
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi tạo booking: " + error.message,
    };
  }
};

const getAllBookings = async () => {
  try {
    const bookings = await Booking.find()
      .populate('user')
      .populate('showTime')
      .lean();

    // Lấy chi tiết booking kèm mỗi booking
    for (let b of bookings) {
      b.bookingDetails = await BookingDetail.find({ booking: b._id }).populate('seat');
    }

    return {
      status: "OK",
      message: "Lấy danh sách booking thành công",
      data: bookings,
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi lấy danh sách booking: " + error.message,
    };
  }
};

const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate('user')
      .populate('showTime')
      .lean();

    if (!booking) {
      throw { status: "ERR", message: "Booking không tồn tại" };
    }

    booking.bookingDetails = await BookingDetail.find({ booking: booking._id }).populate('seat');

    return {
      status: "OK",
      message: "Lấy booking theo ID thành công",
      data: booking,
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi lấy booking: " + error.message,
    };
  }
};

const getBookingByUserId = async (userId) => {
  try {
    const bookings = await Booking.find({ user: userId })
      .populate('user')
      .populate('showTime')
      .lean();

    for (let b of bookings) {
      b.bookingDetails = await BookingDetail.find({ booking: b._id }).populate('seat');
    }

    return {
      status: "OK",
      message: "Lấy booking theo người dùng thành công",
      data: bookings,
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi lấy booking theo người dùng: " + error.message,
    };
  }
};

const updateBookingStatus = async (bookingId, status) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updated) {
      throw { status: "ERR", message: "Không tìm thấy booking để cập nhật" };
    }

    return {
      status: "OK",
      message: "Cập nhật trạng thái booking thành công",
      data: updated,
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi cập nhật booking: " + error.message,
    };
  }
};

const deleteBooking = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw { status: "ERR", message: "Booking không tồn tại" };
    }

    // Xoá booking details trước
    await BookingDetail.deleteMany({ booking: bookingId });

    // Xoá booking
    await Booking.deleteOne({ _id: bookingId });

    return {
      status: "OK",
      message: "Xoá booking thành công",
      data: booking,
    };
  } catch (error) {
    throw {
      status: "ERR",
      message: "Lỗi khi xoá booking: " + error.message,
    };
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingByUserId,
  updateBookingStatus,
  deleteBooking,
};
