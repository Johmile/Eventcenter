const booking = require('../models/booking')

//book a centre
exports.bookCenter = async (req, res, next) => {
    const body = req.body
    if(!body.day || !body.date || !body.event_type || !body.phone || !body.email || !body.gender){
        res.status(403).json({message:'All fields are required', success: false})
    }
    else{
        const booked = await booking.create(req.body)
        res.status(200).json({success: true, message:'successful'})
    }
}

// get all booking
exports.getAllBooking = async (req, res) => {
    const info = await booking.find().sort({'_id': -1})
    res.status(200).json({info: info})
}
//get single booking
exports.getASingleBooking = async (req, res) => {
    const info = await booking.findOne({_id:req.params.id})
    res.status(200).json({info})
}
