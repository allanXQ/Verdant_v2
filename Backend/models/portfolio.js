const mongoose = require('mongoose')
const crypto = require("crypto");
const id = crypto.randomBytes(6).toString("hex");
const date= new Date
year = date.getFullYear()
month = date.getMonth()
day = date.getDate()
today = year+':'+ month + ':' + day

module.exports = Portfolio = mongoose.Schema({
    owner:{type:String, required:true},
    name:{type:String, required:true},
    amount_owned:{type: Number, required:true},
})

const model = mongoose.model('Portfolio', Portfolio)

module.exports = model