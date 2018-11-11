const mongoose = require('mongoose')
const mongodbErrorHandler =  require('mongoose-mongodb-errors')

const bookingSchema = new mongoose.Schema({
    day: Number,
    date: Date,
    event_type: String,
    phone: Number,
    email: String,
    gender: String
})
bookingSchema.plugin(mongodbErrorHandler)
module.exports = mongoose.model('booking', bookingSchema)