const mongoose = require('mongoose');
const Restaurant = mongoose.Schema({
  name: String,
  email: String,
  address: String,
  contact: Number,
  image: String
});

module.exports = mongoose.model('restaurants', Restaurant);
