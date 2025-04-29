const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
  name: String,
  totalSeats: Number,
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
});

const Rooms = mongoose.model("Room", roomsSchema);

module.exports = Rooms;
