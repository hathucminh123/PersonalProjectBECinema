const mongoose = require("mongoose");
const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Genres = mongoose.model("Genre", GenreSchema);
module.exports = Genres;
