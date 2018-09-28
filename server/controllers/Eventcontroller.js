const bodyParser = require('body-parser');
const Event = require('../models/Event');
const verifyToken = require('./verifyToken')
//GET ALL EVENTS
exports.getAllEvent = async (req, res, next) => {
    const Events = await Event.find()
    const totalEvents = await Events.length
    res.json({info:Events, total:totalEvents})
}

// POST NEW EVENT
exports.postNewEvent = async (req, res, next) => {
    const body = req.body;
    if (!body.type || !body.date || !body.time) {
        res.json({
            message:'Please fill in the required inputs'
        })
    }
    else{
        const newEvent = await Event.create(req.body)
        let event = await newEvent.date
        if(event < Date.now()){
            res.json({message:`Invalid event date`})
        }
        res.json({info:newEvent})
    }
}

//GET A SINGLE EVENT
exports.getSingleEvent = async (req, res) => {
    const singleEvent = await Event.findById(req.params.id)
    res.json({message: singleEvent})
}


//DELETE AN EVENT
exports.deleteSingleEvent = (req, res) =>  {
    Event.findByIdAndRemove(req.params.id, (err,Event) =>{
        if(Event){
            res.json({
                message:`You have successfully deleted ${Event}`
            })
        }
        else{
            res.json({message:`Sorry,the ID does not exist`})
        }
    })
}

//UPDATE AN EVENT
exports.updateSingleEvent =  (req, res) => {
    Event.findByIdAndUpdate(req.params.id, (err,Event)=>{
        if (Event){
            res.json({
                message:`${Event} was successfully updated`
            })
        }
        else {
            res.json({
                message:`There is an error updating this event`
            })
        }
    })
}