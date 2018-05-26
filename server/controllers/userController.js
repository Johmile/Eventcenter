const bodyParser = require('body-parser');
const user = require('../models/User');

//GET ALL USERS
exports.getAllUser = async (req,res) => {
    const allUser = await user.find()
        res.json(allUser)
}
//POST A USER
exports.postUser = async (req,res) => {
    const body = req.body;
    if (!body.name && !body.email && !body.password){
        res.json({
            message:`Please fill all fields`
        })
    }
    else{
        const newUser = await user.create(req.body)
            res.json(newUser)
    }
}

//GET A SINGLE USER
exports.getSingleUser = async (req, res) => {
    const singleUser = await findById(req.params.id)
        res.json(singleUser)
}