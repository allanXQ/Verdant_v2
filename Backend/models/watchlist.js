const mongoose = require('mongoose')
const crypto = require("crypto");
const id = crypto.randomBytes(6).toString("hex");
const Watchlist = new mongoose.Schema({
    username:{type: String, default: id},
    email:{type:String, required:true},
    phone:{type: Number, required:true},
    status:{type: String, default:'cleared'},

})

mongoose.exports = mongoose.model('Watchlist', Watchlist)