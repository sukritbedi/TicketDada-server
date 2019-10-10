const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  runtime: String,
  imdb_rating: Number,
  rotten_tomato_rating: Number,
  age_rating: Number,
  image_source: String,
  description: String
});

module.exports = mongoose.model('Movie', movieSchema);
