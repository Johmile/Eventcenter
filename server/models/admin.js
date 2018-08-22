const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    username:{type: String},
    password:{type: String},
    email:{type: String,
    match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
},
    secret:String
})
module.exports = mongoose.model('admin', adminSchema)