const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const user = require('../models/User');
const config = require('../config');

//TO ENCODE PASSWORD OR HASH  PASSWORD, TO REGISTER A USER AND TO RETURN TOKEN
exports.encodePassword = (req, res) => {
  const hashpassword = bcrypt.hashSync(req.body.password);
  user.create({
    name:req.body.name,
    email:req.body.email,
    password:hashpassword
  },
  (err,user) => {
    if (err)
    return res.json(`there is an error registering `)
    const token = jwt.sign({id:user.id},config.secret,{expiresIn:86400})
    res.json({
      auth:true,
      token:token
    })
  })
}

//Decoding the encoded token
exports.decodePassword = (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token)
    return res.json({
      auth:false,
      message:`can not find token`
    })
    jwt.verify(token,config.secret, (err, decoded) => {
      if (err)
      return res.json({
        auth:false,
        message:`failed to authenticate token`
      })
      user.findById(decoded.id, {password:0}, (err, user) => {
        if (err)
        return res.json(`can not find this user`)
        res.json(user)
      })
    })
}

// LOGINING IN EXISTED USER
exports.loginUser = (req, res) => {
  user.findOne({email:req.body.email}, (err,user) =>{
    if (err)
    return res.json(`problem logining in`)
    if (!user)
    return res.json(`No user found`);
    const passwordIsValid = bcrypt.compareSync({password:req.body.password},user.password);
    if (!passwordIsValid)
    return res.json({
      auth:false,
      token:null
    });
    const token = jwt.sign({id:user.id},config.secret);
    res.json({
      auth:true,
      token:token
    })
    res.json({
      auth:true,
      token:token
    })
  })
}