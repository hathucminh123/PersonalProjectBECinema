const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number, // thời lượng (phút)
  director: String,
  actors: [String],
  releaseDate: Date,
  endDate: Date,
  trailerUrl: String,
  posterUrl: String,
  // genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }]

});

const Movies = mongoose.model("Movie", MovieSchema);
module.exports = Movies;
