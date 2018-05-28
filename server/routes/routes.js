const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const verifyToken = require('../controllers/verifyToken')
//CENTER ROUTER
router.post('/centers', verifyToken, Centercontroller.createNewCenter);
router.get('/centers/get', verifyToken, Centercontroller.getAllCenter);
router.get('/centers/get/:id', verifyToken, Centercontroller.getSingleCenter);
router.delete('centers/delete/:id', verifyToken, Centercontroller.deleteSingleCenter);



//EVENT ROUTER
router.post('/events', verifyToken, Eventcontroller.postNewEvent);
router.get('/events/get', verifyToken, Eventcontroller.getAllEvent);
router.get('/events/get/:id', verifyToken, Eventcontroller.getSingleEvent);
router.delete('/events/delete/:id', verifyToken, Eventcontroller.deleteSingleEvent);
router.put('/events/update/:id', Eventcontroller.updateSingleEvent)

//USER ROUTER
router.get('/user/get', userController.getAllUser);
router.post('/user', userController.postUser);
router.get('/user/get/:id', userController.getSingleUser);

//AUTH ROUTES
router.post('/register',authController.encodePassword);
router.post('/login', verifyToken, authController.loginUser)
router.get('/gettokens', verifyToken, authController.decodePassword);

module.exports = router;