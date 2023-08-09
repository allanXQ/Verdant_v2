const mongoose = require("mongoose");
const crypto = require("crypto");
const orderId = crypto.randomBytes(6).toString("hex");

const buyOrders = new mongoose.Schema({
  orderId: { type: String, default: orderId },
  buyerId: { type: String, required: true },
  buyerName: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, required: true },
  totalAssetValue: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("buyOrders", buyOrders);

module.exports = model;
