const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const EventSchema = new mongoose.Schema({
    type: {type: String, require: true},
    date: Date, 
    time: String,
})
EventSchema.plugin(mongodbErrorHandler)
module.exports = mongoose.model('Event', EventSchema);