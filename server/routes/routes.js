const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

//CENTER ROUTER
router.post('/centers', Centercontroller.createNewCenter);
router.get('/centers/get', Centercontroller.getAllCenter);
router.get('/centers/get/:id', Centercontroller.getSingleCenter);
router.delete('centers/delete/:id', Centercontroller.deleteSingleCenter);



//EVENT ROUTER
router.post('/events', Eventcontroller.postNewEvent);
router.get('/events/get', Eventcontroller.getAllEvent);
router.get('/events/get/:id', Eventcontroller.getSingleEvent);
router.delete('/events/delete/:id', Eventcontroller.deleteSingleEvent);
router.put('/:id', Eventcontroller.updateSingleEvent)

//USER ROUTER
router.get('/user/get', userController.getAllUser);
router.post('/user', userController.postUser);
router.get('/user/get/:id', userController.getSingleUser);

//AUTH ROUTES
router.post('/register',authController.encodePassword);
router.get('/gettokens', authController.decodePassword);
router.post('/login', authController.loginUser)

module.exports = router;