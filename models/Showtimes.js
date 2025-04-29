const mongoose = require("mongoose");

const ShowTimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }, // phim nào
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" }, // chiếu ở phòng nào
  startTime: Date, // thời gian bắt đầu
  endTime: Date,
  price: Number,
});

const ShowTime = mongoose.model("ShowTime", ShowTimeSchema);
module.exports = ShowTime;
