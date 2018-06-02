const bodyParser = require('body-parser');
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
    exports.updateUser = async (req, res) => {
        const update = await user.findByIdAndUpdate(req.params.id)
        res.json({
            message:`Update was successful`,
            update:update
        })
    }