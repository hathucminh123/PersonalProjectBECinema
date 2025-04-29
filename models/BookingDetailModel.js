const mongoose = require("mongoose");

const BookingDetailSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seat" },
  price: Number // có thể lưu theo loại ghế
});

module.exports = mongoose.model("BookingDetail", BookingDetailSchema);
