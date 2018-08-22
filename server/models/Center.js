const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    name:{type:String},
    address:String,
    capacity:Number,
    date:{type:String},
    expires:Date,
    available:{type:Boolean, default: true},
    price:String
},{
    timestamps:true
});
module.exports = mongoose.model('center', centerSchema);