const mongoose = require("mongoose");

const Stocks = new mongoose.Schema({
  stockId: { type: String },
  stockName: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("Stocks", Stocks);

module.exports = model;
