const mongoose = require("mongoose");
const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
hours = date.getHours();
minutes = date.getMinutes();
today = year + ":" + month + ":" + day + " " + hours + ":" + minutes;

const MpesaDeposits = new mongoose.Schema({
  mpesaRef: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  created: { type: String, default: today },
});

const model = mongoose.model("MpesaDeposits", MpesaDeposits);

module.exports = model;
