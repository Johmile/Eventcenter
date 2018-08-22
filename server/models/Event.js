const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    type: {type: String, require: true},
    date: String,
    time: String,
})
module.exports = mongoose.model('Event', EventSchema);