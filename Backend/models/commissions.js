const mongoose = require("mongoose");
const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
time = date.getHours();
minutes = date.getMinutes();
today = year + ":" + month + ":" + day + "::" + time + minutes;

const Commissions = new mongoose.Schema({
  userid: { type: string, required: true },
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("Commissions", Commissions);

module.exports = model;
