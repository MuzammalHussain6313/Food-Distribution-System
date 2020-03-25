const mongoose = require('mongoose');
const CharityHouse = mongoose.Schema({
  name: String,
  address: String,
  email: String,
  no_of_members: Number,
  contact: Number,
  type: String,
  bankName: String,
  accountNo: Number,
  image:String
});

module.exports = mongoose.model('charityHouses', CharityHouse);
