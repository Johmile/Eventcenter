const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminSecret = require('../../configuration/adminconfig')
const admin = require('../models/admin')


//ADMIN REGISTRATION
exports.createSuperUser = (req, res) =>{
    const hashpassword = bcrypt.hashSync(req.body.password)
    admin.create({
      username:req.body.username,
      password:hashpassword,
      email:req.body.email
    }, (err, admin) => {
      if(err){
        res.status(500).json(`There is an error creating super user`)
      }
      else{
        if(!req.body.username){
          res.json('fill username')
        }
        res.status(200).json({
          message:`Super user created`,
          admin:admin
        })
      }
    })
  }
  
  //ADMIN LOGIN
  exports.loginAdmin = (req, res) => {
    admin.findOne({username:req.body.username}, (err, admin) => {
      if(err){
        res.status(500).json('There is a problem finding admin username')
      }
      else{
        const isAdminPassword = bcrypt.compareSync(req.body.password, admin.password)
        if(!isAdminPassword){
          res.status(403).json(`Incorrect password`)
        }
        else{
          const token = jwt.sign({id:admin.id, username:admin.username, password:admin.password}, adminSecret.admin, {expiresIn:86400})
          res.status(200).json({
            message:`Welcome admin ${req.body.username}`,
            token:token
          })
        }
      }
    })
  }