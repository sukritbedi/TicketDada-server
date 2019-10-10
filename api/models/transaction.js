const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
  cinema: Number,
  timestamp: Timestamp,
  movie_timings: String
})

module.exports = mongoose.model('Transaction', userSchema);
