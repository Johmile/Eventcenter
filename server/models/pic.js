const mongoose = require('mongoose')
const pics = new mongoose.Schema({
    pic:String
})
module.exports= mongoose.model('pic',pics)