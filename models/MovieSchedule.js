const mongoose = require("mongoose");

const MovieScheduleSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" }, // phim nào
  theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" }, // chiếu ở phòng nào
  startDate: Date, // thời gian bắt đầu
  endDate: Date,
//   price: Number, // giá vé
});

const MovieSchedule = mongoose.model("MovieSchedule", MovieScheduleSchema);
module.exports = MovieSchedule;
