const mongoose = require("mongoose");

const closedTrades = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  buyerId: { type: String, required: true },
  sellerId: { type: String, required: true },
  stockName: { type: String, required: true },
  stockAmount: { type: Number, required: true },
  price: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("closedTrades", closedTrades);

module.exports = model;
