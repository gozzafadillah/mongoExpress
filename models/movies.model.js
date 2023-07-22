const mongoose = require("mongoose");

const { Schema } = mongoose;

const moviesSchma = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("movies", moviesSchma);
