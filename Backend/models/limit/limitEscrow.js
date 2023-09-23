const mongoose = require("mongoose");

//stores stocknames and amount for a sell order and cash amount for a buy order
const Escrow = new mongoose.Schema({
  orderId: { type: String, required: true },
  orderType: { type: String, required: true },
  userId: { type: String, required: true },
  stockName: { type: String, default: "" },
  stockAmount: { type: Number, default: 0 },
  cashAmount: { type: Number, default: 0 },
});

const model = mongoose.model("Escrow", Escrow);

module.exports = model;
