const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    name:{type:String,require:true,unique:true},
    address:String,
    capacity:Number
});
module.exports = mongoose.model('center', centerSchema);