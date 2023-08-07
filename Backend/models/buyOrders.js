const mongoose = require("mongoose");
const crypto = require("crypto");
const id = crypto.randomBytes(10).toString("hex");

const date = new Date();
year = date.getFullYear();
month = date.getMonth();
day = date.getDate();
today = year + ":" + month + ":" + day;

const buyOrders = new mongoose.Schema({
  orderId: { type: String, default: id },
  buyername: { type: String, required: true },
  stockname: { type: String, required: true },
  stockAmount: { type: Number, default: 0 },
  cashAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  created: { type: String, default: today },
});

const model = mongoose.model("buyOrders", buyOrders);

module.exports = model;
