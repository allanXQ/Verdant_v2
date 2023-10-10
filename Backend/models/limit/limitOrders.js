const mongoose = require("mongoose");
const crypto = require("crypto");

const limitOrders = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: () => crypto.randomBytes(6).toString("hex"),
      unique: true,
    },
    buyerId: { type: String, required: true },
    buyerName: { type: String, required: true },
    stockName: { type: String, required: true },
    stockAmount: { type: Number, required: true },
    totalAssetValue: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("limitOrders", limitOrders);

module.exports = model;
