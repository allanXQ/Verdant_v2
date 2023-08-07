const mongoose = require("mongoose");
const crypto = require("crypto");
const id = crypto.randomBytes(10).toString("hex");

const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;

//completed trades
const Trades = new mongoose.Schema({
  tradeId: { type: String, default: id },
  buyerId: { type: String, required: true },
  sellerId: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  created: { type: String, default: today },
});

const model = mongoose.model("Trades", Trades);

module.exports = model;
