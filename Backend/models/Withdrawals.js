const mongoose = require("mongoose");
const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;
//add withdrawal mode etc
const Withdrawals = new mongoose.Schema({
  userid: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  created: { type: String, default: today },
});

const model = mongoose.model("Withdrawals", Withdrawals);

module.exports = model;
