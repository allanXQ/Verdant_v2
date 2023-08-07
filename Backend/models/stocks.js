const mongoose = require('mongoose')
const crypto = require("crypto");
const id = crypto.randomBytes(6).toString("hex");
const date= new Date
year = date.getFullYear()
month = date.getMonth()
day = date.getDate()
today = year+':'+ month + ':' + day

const Stocks = new mongoose.Schema({
    stockid:{type: String},
    name:{type:String, required:true, unique:true},
    amount:{type: Number, required:true},
    created:{type:String, default:today}
})

const model = mongoose.model('Stocks', Stocks)

module.exports = model