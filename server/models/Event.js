const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    type:{type:String,require:true},
    date:Date,
    time:String,
})
module.exports = mongoose.model('Event',EventSchema);