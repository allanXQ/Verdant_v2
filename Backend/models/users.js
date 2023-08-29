const mongoose = require("mongoose");

const { roles } = require("../config");

const isLocalAuth = function () {
  return this.authMethod === "local";
};

const Portfolio = mongoose.Schema({
  ownerId: { type: String, required: true },
  stockName: { type: String, required: true },
  amountOwned: { type: Number, required: true },
});

const Referrals = mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
});

//add kyc
const Users = mongoose.Schema({
  userid: { type: String },
  role: { type: String, default: roles.user },
  firstname: { type: String },
  lastname: { type: String },
  googleName: { type: String, required: !isLocalAuth },
  username: { type: String, required: isLocalAuth, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: isLocalAuth, unique: true },
  accountBalance: { type: Number, default: 50 },
  authMethod: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
  status: { type: String, default: "inactive" },
  referrer: { type: String, default: "none" },
  refreshToken: { type: String },
  passwordResetToken: { type: String },
  password: { type: String, required: isLocalAuth },
  portfolio: [Portfolio],
  referrals: [Referrals],
  created: { type: Date, default: Date.now },
});

const model = mongoose.model("Users", Users);

module.exports = model;
