const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  phone_number:Number,
  email_id:{ type:String, required: true, unique:true},
  password:{ type:String, required: true},
  type:{type:Number, required: true}
});

module.exports = mongoose.model('User', userSchema);
