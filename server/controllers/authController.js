const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
const async = require('async')
const crypto = require('crypto')

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
      date:body.date
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
          const token = jwt.sign({id:user.id, email:user.email}, config.secret, {expiresIn:'1h'})
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


// RESET PASSWORD
exports.resetPassword = (req, res) => {
  async.waterfall([
    () => {
      user.findOne({resetpasswordtoken:req.params.token, expiresIn:'1h'}, (err, user) => {
        if(!user) {
          res.json(`The reset password token is invalid or has expired`)
        }
        if (req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, (err) => {
            user.resetpasswordtoken = undefined
          })
        }
        else {
          res.json({
            alert:`Error`,
            message:`passwords do not match, try again`
          })
        }
      })
    },
    (user) => {
      const admin = nodemailer.createTransport({
        service:`Gmail`,
        auth:{
          username:`otitojuoluwapelumi@gmail.com`,
          password:process.env.GMAILPW
        }
      });
      const recipient = {
        from:`otitojuoluwapelumi@gmail.com`,
        to:user.email,
        subject:`Event password recovery`,
        text:`Your password has been successfully recovered and has been set to ${req.body.confirm}`
      }
      admin.sendMail(recipient, (err, success) => {
        if (err) {
          res.json(`Sending failed`)
        }
        else {
          res.json({
            message:`An email has been sent to ${user.email} with login details`
          })
        }
      })
    }
  ])
}
//GET RESET
exports.getResetPassword = (req, res) => {
  user.findOne({resetpasswordtoken:req.params.token, expiresIn:'1h'}, (err, user) => {
    if (!user) {
      res.json(`Token does not exist or has expires, please start again`)
    }
    else {
      res.json(`You will redirect shortly`)
    }
  })
}
//USING UPDATE HAS RESET PASSWORD
exports.updatePassword = (req, res) => {
  async.waterfall([
    (done) => { //function that finds user token 
    user.findOne({resetpasswordtoken:req.params.token, expiresIn:'1h'}, (err, user) => {
    if (!user) {
      res.json(`Token is invalid or has expired, try again next time`)
    }
    if (req.body.password === req.body.confirm) {
      user.update(req.body.password, (err) => {
        user.resetpasswordtoken = undefined
        res.json(`Password has been changed successfully`)
        user.save( () =>{
          done(err, user)
        })
        
      })
    }
    else {
      res.json(`Passwords do not match`)
    }
  })
},
  (user) => { //function that create email
    const admin = nodemailer.createTransport({
      service:`Gmail`,
      auth:{
        username:`otitojuoluwapelumi@gmail.com`,
        password:process.env.GMAILPW
      }
    });
    const recipient = {
      from:`otitojuoluwapelumi@gmail.com`,
      to:user.email,
      subject:`password recovery`,
      text:`password has been changed to user.password`
    }
    admin.sendMail(recipient, (err, success) => {
      if (err) {
        res.json(`Mail not sent`)
      }
      else {
        res.json(`Mail was succesfully sent`)
      }
    })
  }
]),
    (err) => {
      if(err) next(err)
      } }



//ALTERNATIVE TO FORGOTPASSWORD
exports.forgotPassword = (req, res) => {
  user.findOne({email:req.body.email}, (err, user) => {
    if (!user) {
      res.json(`No user with this email`)
    }
    else {
      crypto.randomBytes(20, (err, buffer) => {
        const token = buffer.toString('hex')
        user.resetpasswordtoken = token
        user.save();
      })
        // send mail
        const admin = nodemailer.createTransport({
          service:'Gmail',
          auth:{
            username:'otitojuoluwapelumi@gmail.com',
            password:process.env.GMAILPW
          }
        })
        const recipient = {
          from:'otitojuoluwapelumi@gmail.com',
          to:user.email,
          subject:'testing',
          text:`You have successfully requested for password reset, follow this 
                   link http://localhost:1000/reset/:token and reset your password` 
        }
        admin.sendMail(recipient, (err) => {
          if (err){
            res.json({
              error:err,
              
            })
          }
          else{
            res.json(`mail sent`)
          }
        })
      
    }
  })
}