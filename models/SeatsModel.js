const mongoose = require("mongoose");
const SeatSchema = new mongoose.Schema({
  name: String, // Ví dụ: "A1", "B5"
  type: { type: String, enum: ["standard", "vip"], default: "standard" },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" }, // thuộc phòng nào
});

const Seats = mongoose.model("Seat", SeatSchema);
module.exports = Seats;
