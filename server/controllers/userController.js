const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const user = require('../models/User');


//GET ALL USERS
exports.getAllUser = async (req, res) => {
    const allUser = await user.find()
        res.json(allUser)
}
//POST A USER
exports.postUser = async (req, res) => {
    const body = req.body;
    if (!body.name && !body.email && !body.password){
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
        const newUser = await user.create(req.body)
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
        user.findByIdAndUpdate(req.body.id, req.body,{new:true}, (err, user)=>{
            if(err){
                res.status(500).json('There is a problem updating user')
            }
            else{
                user.password = hash
                res.status(200).json({
                    message:'Updated',
                    user:user
                })
            }
        })
    }