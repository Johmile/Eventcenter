const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const user = require('../models/User');
const config = require('../config');
const verifyToken = require('./verifyToken')

//TO ENCODE PASSWORD OR HASH  PASSWORD, TO REGISTER A USER AND TO RETURN TOKEN
exports.encodePassword = async (req, res, next) => {
  const body = req.body;
  const hashpassword = bcrypt.hashSync(req.body.password);
  if (!body.name && !body.email && !body.password && !body.date) {
    res.json({
      message:`Please fill in all required input fields`
    })
  }
  else if (body.name.length > 20) {
    res.json({
      message:`Name must not be more than 20 characters`
    })
  }
  else if (body.password.length < 8) {
    res.json({
      message:`Password must be more than 7 characters`
    })
  }
  else {
    await user.create({
      name:body.name,
      email:body.email,
      password:hashpassword,
      date:body.date.now()
    })
    const token = jwt.sign({id:user.id}, config.secret, {expiresIn:86400})
    res.json({
      message:`Registration was successful`,
      auth:true,
      token:token
    })
  }
 
}

//Decoding the encoded token
exports.decodePassword = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token){
    res.json({
      message:`No token provided`,
      token:null
    })
  }
  else { //VERIFY TOKEN AND RETURN USER WITH THE TOKEN
          await jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
              res.json({
                message:`Authenication failed`,
                token:null
              })
            }
            else {
                user.findById(req.user, {password:0}, (err, user) => {
                    if (err) {
                      res.json({
                        message:`Error decoding token`,
                        auth:false,
                        token:null
                      })
                    }
                    else if (!user) {
                      res.json({
                        message:`No user found`
                      })
                    }
                    else {
                      res.json({
                        message:`Decoding successful`,
                        auth:true,
                        user:user
                      })
                    }
              })
            }
          })
        }
    
}

// LOGIN  EXISTED USER
exports.loginUser = async (req, res) => {
  if(!req.body.email && !req.body.password) {
    res.json({
      message:`Please fill in required input field`
    })
  }
  else {
    await user.findOne({email:req.body.email}, (err, user) => {
    if (err) {
      res.json({
        message:`Unable to complete task`
      })
    }
    else if (!user) {
      res.json({
        message:`No user found`
      })
    }
    else{
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        res.json({
          message:`Wrong password`,
          auth:false,
          token:null
        })
      }
      else { // RETURN USER TOKEN
          const token = jwt.sign({id:user.id, email:user.email}, config.secret, {expiresIn:'2h'})
          res.json({
            message: `Login was successful`,
            auth:true,
            token:token
          })
      }
    }
  
   })
  }
}

