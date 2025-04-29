const mongoose = require("mongoose");


const MovieGenreSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true }
  });
  module.exports = mongoose.model("MovieGenre", MovieGenreSchema);