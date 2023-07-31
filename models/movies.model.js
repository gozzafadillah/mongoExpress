const mongoose = require("mongoose");

const { Schema } = mongoose;

const MoviesSchma = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("movies", MoviesSchma);
