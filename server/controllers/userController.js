const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const user = require('../models/User');
const multer = require('multer')
const path = require('path')


// const storage = multer.diskStorage({
//     destination:'../images/'
//     ,
//     filename: function(req, file, cb){
//         cb(null, file.fieldname + Date.now() + file.originalname)
//     }
// })
// const upload = multer({
//     storage:storage
// })

// exports.uploadImages = upload.single('photo'), (req, res) => {
//     console.log(req.file)
// }

//GET ALL USERS
exports.getAllUser = async (req, res) => {
    const allUser = await user.find()
        res.json(allUser)
}
const storage = multer.diskStorage({
    destination:'../images/',
    filename:(req, file, cb)=>{
        cb(null, file.fieldname +  Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:(req, file, cb) => {
        checkFileType(file, cb)
    }
})
const checkFileType = (file, cb)=>{
    //file type
    const fileType = /jpeg|jpg|png/
    //file extension
    const extname = fileType.test(path.extname(file.originalname).toLowerCase)
    //mimetype
    const mime = fileType.test(file.mimetype)
    if (mime || extname){
        return cb(null, true)
    }
    else{
        cb('Error: Images only')
    }
}
//POST A USER
exports.postUser =   (req, res) => {
    const hash = bcrypt.hashSync(req.body.password,10)
    const body = req.body;
    if (!body.name || !body.email || !body.password){
        res.json({
            message:`Please fill all input fields`
        })
    }
    else if (body.name.length > 20) {
        res.json({
            message:`Name is more than 20 characters`
        })
    }
    else{
        const newUser =  user.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            pic:req.file.path
        })
        newUser.password = hash
        newUser.save()
        res.json(newUser)
    }
}


//GET A SINGLE USER
exports.getSingleUser = async (req, res) => {
    const singleUser = await user.findById(req.params.id)
        res.json(singleUser)
}
//DELETE A USER
exports.deleteUser = async (req, res) => {
    const removeUser = await user.findByIdAndRemove(req.params.id)
    res.json({
        message:`You have succesfully remove selected user`,
        user:removeUser
    })
}
    //UPDATE USER
exports.updateUser = (req, res) => {
        const hash = bcrypt.hashSync(req.body.password,10)
        user.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, user)=>{
            if(err){
                res.status(500).json('There is a problem updating user')
            }
            else{
                user.password = hash
                user.save()
                res.status(200).json({
                    message:'Updated',
                    user:user
                })
            }
        })
}
    //Upload image
// const storage = multer.diskStorage({
//         destination:'../images/',
//         filename:(req, file, cb)=>{
//             cb(null, file.fieldname +  Date.now() + path.extname(file.originalname))
//         }
//     })
// const upload = multer({
//         storage:storage,
//         limits:{fileSize:1000000},
//         fileFilter:(req, file, cb) => {
//             checkFileType(file, cb)
//         }
//     })
// const checkFileType = (file, cb)=>{
//         //file type
//         const fileType = /jpeg|jpg|png/
//         //file extension
//         const extname = fileType.test(path.extname(file.originalname).toLowerCase)
//         //mimetype
//         const mime = fileType.test(file.mimetype)
//         if (mime || extname){
//             return cb(null, true)
//         }
//         else{
//             cb('Error: Images only')
//         }
//     }
// exports.uploadImages = (req, res) => {
//         upload(req, res, (err) => {
//             if(err){
//                 res.json({
//                     message:err
//                 })
//             }
//             else{
//                 console.log(req.file)
//                 if(req.file == undefined){
//                     res.json({
//                         message:'Error: No file selected'
//                     })
//                 }
//                 else if (req.file == '') {
//                     res.json({
//                         message: "I am empty"
//                     })
//                 }
//                 else{
//                     res.json({
//                         message:'File uploaded',
//                         file:`images/${req.file.filename}`
//                     })
//                 //     res.json({
//                 //         message: "i got here"
//                 //     })
//                 }
//             }
//         })
//     }
    // Search user by name
    exports.searchUser = async (req, res) => {
        const result = await user.findOne({name:req.body.name}, {password:0})
            if(!result){
                res.json('No result found')
            }
            else{
                res.json({result:result})
            }
       
    }