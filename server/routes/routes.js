const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');

//CENTER CONTROLLER
router.post('/centers', Centercontroller.createNewCenter);
router.get('/centers', Centercontroller.getAllCenter);
router.get('/:id', Centercontroller.getSingleCenter);


//EVENT CONTROLLER
router.post('/events', Eventcontroller.postNewEvent)
router.get('/events', Eventcontroller.getAllEvent)
module.exports = router;