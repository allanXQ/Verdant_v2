const mongoose = require("mongoose");

const Assets = new mongoose.Schema({
  assetId: { type: String, required: true, unique: true },
  assetName: { type: String, required: true, unique: true },
  coinPair: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("Assets", Assets);

module.exports = model;
