const mongoose = require("mongoose");
const crypto = require("crypto");
const orderId = crypto.randomBytes(6).toString("hex");

const sellOrders = new mongoose.Schema({
  orderId: { type: String, default: orderId },
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("sellOrders", sellOrders);

module.exports = model;
