const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const verifyToken = require('../controllers/verifyToken')
const admincontroller = require('../controllers/admincontroller')
const { catchErrors } = require('../handlers/errorhandler')
const pic = require('../models/pic')


const user = require('../models/User')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')

//CENTER ROUTER
router.post('/centers',  catchErrors(Centercontroller.createNewCenter));
router.get('/centers/get',  catchErrors(Centercontroller.getAllCenter));
router.get('/centers/get/:id',  catchErrors(Centercontroller.getSingleCenter));
router.delete('centers/delete/:id',  catchErrors(Centercontroller.deleteSingleCenter));
router.put('/available/:id', catchErrors(Centercontroller.updateSingleCenter))



//EVENT ROUTER
router.post('/events',  catchErrors(Eventcontroller.postNewEvent));
router.get('/events/get', catchErrors(Eventcontroller.getAllEvent));
router.get('/events/get/:id',  catchErrors(Eventcontroller.getSingleEvent));
router.delete('/events/delete/:id', verifyToken, (Eventcontroller.deleteSingleEvent));
router.put('/events/update/:id', verifyToken, catchErrors(Eventcontroller.updateSingleEvent))

//USER ROUTER
router.get('/user/get', catchErrors(userController.getAllUser));

router.get('/user/get/:id', catchErrors(userController.getSingleUser));
router.put('/user/update/:id', verifyToken, catchErrors(userController.updateUser));
router.delete('/user/delete/:id', verifyToken, catchErrors(userController.deleteUser))

//AUTH ROUTES
router.post('/register', catchErrors(authController.encodePassword));
router.post('/login', authController.loginUser)
router.get('/gettokens',  catchErrors(authController.decodePassword));

//FORGOT PASSWORD ROUTES
router.post('/forgot', authController.forgotPassword)
//router.post('/reset', authController.updatePassword)
router.put('/reset/:email', authController.resetPassword)
router.post('/message', catchErrors(authController.reportProblem))

//Admin routes
router.post('/admin', catchErrors(admincontroller.createSuperUser))
router.post('/admin/login', admincontroller.loginAdmin)
router.get('/admin', catchErrors(admincontroller.getAllAdmin))
router.delete('/admin/:id', catchErrors(admincontroller.deleteAdmin))
router.put('/admin/:id', catchErrors(admincontroller.updateProfile))

//router.post('/upload', userController.uploadImages)
router.post('/search', userController.searchUser)


//Using cloudinary
const storage = multer.diskStorage({
    filename:function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
const imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
        return cb(new Error('Only image files are allowed'), false)
    }
    else{
        cb(null,true)
    }
}
var upload = multer({
    storage:storage,
    fileFilter:imageFilter
})
var cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name:'otitoju',
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports = router;