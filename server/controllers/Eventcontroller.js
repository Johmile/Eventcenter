const bodyParser = require('body-parser');
const Event = require('../models/Event');

//GET ALL EVENTS
exports.getAllEvent = async (req, res) => {
    const Events = await Event.find()
    res.json(Events)
}

// POST NEW EVENT
exports.postNewEvent = async (req, res) => {
    const body = req.body;
    if (!body.type && !body.date && !body.time) {
        res.json({
            message:'Please fill in the required inputs'
        })
    }
    else{
        const newEvent = await Event.create(req.body)
        res.json(newEvent)
    }
}