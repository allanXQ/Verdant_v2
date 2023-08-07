const mongoose = require("mongoose");
const uuid = require("uuid");
const orderId = uuid.v4();

const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;

const SellOrders = new mongoose.Schema({
  orderId: { type: String, default: orderId },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  created: { type: String, default: today },
});

const model = mongoose.model("SellOrders", SellOrders);

module.exports = model;
