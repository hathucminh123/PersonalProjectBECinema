const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: String,
  location: String,
});

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
    