const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');

//CENTER CONTROLLER
router.post('/centers', Centercontroller.createNewCenter);
router.get('/centers/get', Centercontroller.getAllCenter);
router.get('/centers/get/:id', Centercontroller.getSingleCenter);
router.delete('centers/delete/:id', Centercontroller.deleteSingleCenter);



//EVENT CONTROLLER
router.post('/events', Eventcontroller.postNewEvent);
router.get('/events/get', Eventcontroller.getAllEvent);
router.get('/events/get/:id', Eventcontroller.getSingleEvent);
router.delete('/events/delete/:id', Eventcontroller.deleteSingleEvent);
router.put('/:id', Eventcontroller.updateSingleEvent)

module.exports = router;