const mongoose = require("mongoose");
const crypto = require("crypto");
const orderId = crypto.randomBytes(6).toString("hex");

const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;

const sellOrders = new mongoose.Schema({
  orderId: { type: String, default: orderId },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  created: { type: String, default: today },
});

const model = mongoose.model("sellOrders", sellOrders);

module.exports = model;
