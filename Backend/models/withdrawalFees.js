const mongoose = require('mongoose')
const date= new Date
year = date.getFullYear()
month = date.getMonth()
day = date.getDate()
hours = date.getHours()
minutes = date.getMinutes()
today = year+':'+ month + ':' + day +' ' + hours + ':' + minutes

const withdrawal_fees = new mongoose.Schema({
    username:{type: String, required:true},
    amount:{type: String, required:true},
    created:{type: String, default:today}
})

const model = mongoose.model('withdrawal_fees', withdrawal_fees)

module.exports = model