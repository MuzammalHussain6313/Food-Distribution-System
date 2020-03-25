const mongoose = require('mongoose');
const Donation = mongoose.Schema({
  amount: Number,
  sender_bank: String,
  sender_card: Number,
  sender_accountNo: Number,
  date: Date,
  receiver_bank: String,
  receiver_card: Number,
  receiver_accountNo: Number
});

module.exports = mongoose.model('donations', Donation);
