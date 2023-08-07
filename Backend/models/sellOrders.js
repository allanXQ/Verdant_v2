const mongoose = require("mongoose");
const crypto = require("crypto");
const id = crypto.randomBytes(10).toString("hex");

const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;

const SellOrders = new mongoose.Schema({
  orderId: { type: String },
  sellerId: { type: String, required: true },
  buyerId: { type: String, default: "none" },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, default: 0 },
  price: { type: Number, required: true },
  status: { type: String, default: "pending" },
  created: { type: String, default: today },
});

const model = mongoose.model("SellOrders", SellOrders);

module.exports = model;
