const mongoose = require('mongoose');
const Food = mongoose.Schema({
  name: String,
  quantity: Number,
  expiry_date: Date,
  type: String,
  image: String
});

module.exports = mongoose.model('foods', Food);
