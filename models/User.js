const mongoose = require('mongoose');
const User = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  username: String,
  password: String,
  type: String,
  image: String
});

module.exports = mongoose.model('users', User);
