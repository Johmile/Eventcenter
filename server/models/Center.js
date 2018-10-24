const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const centerSchema = new mongoose.Schema({
    name:{type:String},
    address:String,
    capacity:Number,
    date:{type:Date},
    expires:Date,
    available:{type:Boolean, default: true},
    price:String,
    description:String,
    facility: String,
    terms:String,
    contact:Number,
    location:String,
    lat:Number,
    lng:Number,
    chair: {type:String, default: 'null'},
    table: {type:String, default: 'null'},
    parking: {type:String, default: 'null'},
    toilet: {type:String, default: 'null'},
    tv: {type:String, default: 'null'},
    sound: {type:String, default: 'null'},
    air: {type:String, default: 'null'},
    light: {type:String, default: 'null'},
    security: {type:String, default: 'null'},
    price: String,
    photo: String
},{
    timestamps:true
});
centerSchema.plugin(mongodbErrorHandler)
module.exports = mongoose.model('center', centerSchema);