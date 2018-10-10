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
const config = require('../../configuration/config');
const verifyToken = require('./verifyToken')

//TO ENCODE PASSWORD OR HASH  PASSWORD, TO REGISTER A USER AND TO RETURN TOKEN
exports.encodePassword = async (req, res) => {
  //console.log('hello')
  const body = req.body;
  const emailExist = await user.findOne({email: req.body.email})
  const hashpassword = bcrypt.hashSync(req.body.password,10);
  if (!body.name || !body.email  || !body.password || !body.secret) {
    res.json({
      message:`Please fill in all required input fields`,
      auth: false
    })
  }
  else if (body.name.length > 20) {
    res.json({
      message:`Name must not be more than 20 characters`,
      auth: false
    })
  }
  else if (body.password.length < 8) {
    res.json({
      message:`Password must be more than 7 characters`,
      auth: false
    })
  }
  else if(emailExist){
    res.json({message:'Email already exist', auth: false})
  }
  else {
    await user.create({
      name:body.name,
      email:body.email,
      password:hashpassword,
      date:body.date,
      secret:body.secret
    })
    res.json({
      message:`Registration was successful`,
      auth:true
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
                user.findById(decoded.id, {password:0}, (err, user) => {
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
  if(req.body.email == '' || req.body.password == '') {
    res.json({
      message:`Please fill in required input field`,
      auth: false
    })
  }
  else {
    await user.findOne({email:req.body.email}, (err, user) => {
    if (err) {
      res.json({
        message:`Unable to complete task`,
        auth: false
      })
    }  
    else if (!user) {
      res.json({
        message:`Wrong or invalid email address`,
        auth: false
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
          var id = user.id
  
          res.json({
            message: `Login was successful`,
            auth:true,
            token:token,
            id:id
          })
      }
    }
  
   })
  }
}


//  REPORTING ISSUES
exports.reportProblem = (req, res) => {
  var transport = nodemailer.createTransport({
    service:'Gmail',
    auth: {
      user:'otitojuoluwapelumi@gmail.com',
      pass:process.env.GMAILPW
    }
  })
  var mailOptions = {
    from:'otitojuoluwapelumi@gmail.com',
    to:req.body.email,
    subject:'report issue',
    html:'<p>you have submission from</p> <ul><li> name:'+req.body.name +'</li><li> Email:'+req.body.email+'</li><li>message:'+req.body.message+'</li></ul>'

  }
  transport.sendMail(mailOptions, (err) => {
    if (err){
      console.log('Mail not sent')
      res.json('not sent')
    }
    else{
      console.log('Mail sent successfully')
      res.json('Mail sent successfully')
    }
  })
}
exports.forgotPassword = (req, res) => {
  user.findOne({email:req.body.email}, (err, user) => {
    if (!user){
      res.status(401).json(`No user with such email address`)
    }
    else {
      if(req.body.secret === user.secret){
        var transport = nodemailer.createTransport({
          service:'Gmail',
          auth:{
            user:'otitojuoluwapelumi@gmail.com',
            pass:process.env.GMAILPW
          }
        })
        var mailOptions = {
          from:'otitojuoluwapelumi@gmail.com',
          to:req.body.email,
          subject:'password recovery',
          html:'<p>you have requested for password reset</p>with Email:'+req.body.email+
          'kindly follow this link to change your password http://'+req.headers.host+'/reset/'+req.body.email
        }
        transport.sendMail(mailOptions, (err) => {
          if (err){
            res.json('mail not sent')
          }
          else {
            res.json('mail sent')
          }
        })
      }
      else{
        res.json({
          message:`You are trying to trespass`
        })
      }
      
    }
  })  
}     

exports.resetPassword = (req, res) => {
  const hashpassword = bcrypt.hashSync(req.body.password,10)
  user.findOne({email:req.params.email}, (err, user) =>{
    if (!user){
      res.json('No user with such email')
    }
    else{
      if (req.body.password === req.body.confirm && req.body.secret === user.secret){
        user.password = hashpassword
        user.save()
        
        var transport = nodemailer.createTransport({
          service:'Gmail',
          auth:{
            user:'otitojuoluwapelumi@gmail.com',
            pass:process.env.GMAILPW
          }
        })
        var mailOptions = {
          from:'otitojuoluwapelumi@gmail.com',
          to:user.email,
          subject:'password recovery',
          html:'<p>you have change your password to </p> password:'+req.body.password
        }
        transport.sendMail(mailOptions, (err) => {
          if (err){
            res.json('mail not sent')
          }
          else {
            res.json('mail sent')
          }
        })
      }
      else {
        res.json('passwords do not match or wrong user secret')
      }
      
    }
  })
}  