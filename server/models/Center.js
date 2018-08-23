const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    name:{type:String},
    address:String,
    capacity:Number,
    date:{type:Date},
    expires:Date,
    available:{type:Boolean, default: true},
    price:String,
    description:String,
    terms:String,
    contact:Number,
    location:String,
    lat:Number,
    lng:Number
},{
    timestamps:true
});
module.exports = mongoose.model('center', centerSchema);