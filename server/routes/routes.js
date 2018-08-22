const express = require('express');
const router = express.Router();
const  Centercontroller = require('../controllers/Centercontroller');
const Eventcontroller = require('../controllers/Eventcontroller');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const verifyToken = require('../controllers/verifyToken')
const admincontroller = require('../controllers/admincontroller')
const pic = require('../models/pic')


const user = require('../models/User')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcryptjs')

//CENTER ROUTER
router.post('/centers',  Centercontroller.createNewCenter);
router.get('/centers/get',  Centercontroller.getAllCenter);
router.get('/centers/get/:id',  Centercontroller.getSingleCenter);
router.delete('centers/delete/:id',  Centercontroller.deleteSingleCenter);
router.put('/available/:id', Centercontroller.updateSingleCenter)



//EVENT ROUTER
router.post('/events', verifyToken, Eventcontroller.postNewEvent);
router.get('/events/get', Eventcontroller.getAllEvent);
router.get('/events/get/:id', verifyToken, Eventcontroller.getSingleEvent);
router.delete('/events/delete/:id', verifyToken, Eventcontroller.deleteSingleEvent);
router.put('/events/update/:id', verifyToken, Eventcontroller.updateSingleEvent)

//USER ROUTER
router.get('/user/get', userController.getAllUser);

router.get('/user/get/:id', verifyToken, userController.getSingleUser);
router.put('/user/update/:id', verifyToken, userController.updateUser);
router.delete('/user/delete/:id', verifyToken, userController.deleteUser)


//AUTH ROUTES
router.post('/register', authController.encodePassword);
router.post('/login', authController.loginUser)
router.get('/gettokens',  authController.decodePassword);

//FORGOT PASSWORD ROUTES
router.post('/forgot', authController.forgotPassword)
//router.post('/reset', authController.updatePassword)
router.put('/reset/:email', authController.resetPassword)
router.post('/message', authController.reportProblem)

//Admin routes
router.post('/admin', admincontroller.createSuperUser)
router.post('/admin/login', admincontroller.loginAdmin)
router.get('/admin', admincontroller.getAllAdmin)
router.delete('/admin/:id', admincontroller.deleteAdmin)
router.put('/admin/:id', admincontroller.updateProfile)

//router.post('/upload', userController.uploadImages)
router.post('/search', userController.searchUser)


// const storage = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, './uploads/')
//     },
//     filename:(req, file, cb)=>{
//         // cb(null, new Date().toISOString()+ file.fieldname+ file.originalname)
//         cb(null, file.fieldname +  Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage:storage,
//     limits:{fileSize:1000000},
//     fileFilter:(req, file, cb) => {
//         checkFileType(file, cb)
//     }
// })
// const checkFileType = (file, cb)=>{
//     //file type
//     const fileType = /jpeg|jpg|png/
//     //file extension
//     const extname = fileType.test(path.extname(file.originalname).toLowerCase)
//     //mimetype
//     const mime = fileType.test(file.mimetype)
//     if (mime || extname){
//         return cb(null, true)
//     }
//     else{
//         cb('Error: Images only')
//     }
// }

// router.post('/upload',upload.single('pic') ,(req, res) =>{
//    // console.log(req.file)
//     if (!req.file){
//         res.json({message:`Error: No file selected`})
//     }   
//     else{
//         pic.create({
        
//             pic:req.file.path,
            
//         },(err,user)=>{
//             if(err){
//                 res.json({message:err})
//             }
//             else{
//                 res.json({message:user})
//             }
//         })
//     } 

// });
// router.get('/img', async(req, res)=> {
//     const picture =await pic.find()
//     res.json(picture)
// })
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