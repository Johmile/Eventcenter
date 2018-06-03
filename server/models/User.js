const mongoose = require('mongoose');
const email = require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type:email, required: true, unique:true},
    password: String,
    resetpasswordtoken: String,
    date: Date
});
module.exports = mongoose.model('user', userSchema);