const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminSecret = require('../../configuration/adminconfig')
const admin = require('../models/admin')
const nodemailer = require('nodemailer')


//ADMIN REGISTRATION
exports.createSuperUser = async(req, res) =>{
    const hashpassword = bcrypt.hashSync(req.body.password)
    const body = req.body;
    if(!body.username || !body.password || !body.email){
      res.json({
        message:'please fill all require inputs'
      })
    }
    else if(body.username.length >15){
      res.json({
        message:'username cannot be more than 15 characters'
      })
    }
    else if(body.password.length < 8){
      res.json({
        message:'password must be more than 7 characters'
      })
    }
    else{
      const Admin = await admin.create(req.body)
      Admin.password = hashpassword
      Admin.save()
      res.json(Admin)
    }
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
          const token = jwt.sign({id:admin.id, username:admin.username, email:admin.email}, adminSecret.admin, {expiresIn:86400})
          res.status(200).json({
            message:`Welcome admin ${req.body.username}`,
            token:token
          })
        }
      }
    })
  }
  //ADMIN CHANGE PASSWORD
  exports.adminChangePassword = (req, res) => {
    admin.findOne({email:req.body.email}, (err, admin) => {
      if(!admin){
        res.json('No admin with such email')
      }
      else {
        if (req.body.secret === admin.secret){
          var transport = nodemailer.createTransport({
            service:'Gmail',
            auth:{
              user:'otitojuoluwapelumi@gmail.com',
              pass:process.env.GMAILPASS
            }
          })
          var mailOptions = {
            from:'otitojuoluwapelumi@gmail.com',
            to:req.body.email,
            subject:'Admin password reset',
            html:'<p> please follow this link and reset your password http://'+req.headers.host+'/admin-reset/'+req.body.email +'</p> '
          }
          transport.sendMail(mailOptions, (err) => {
            if (err){
              res.json('Unable to send mail')
            }
            else{
              res.json('mail sent')
            }
          })
        }
        else{
          res.json('Incorrect secret')
        }
      }
    })
  }

  //RESET ADMIN PASSWORD
  exports.resetAdminPassword = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    admin.findOne({email:req.params.email}, req.body, {new:true}, (err, admin) => {
      if(!admin){
        res.json('Invalid admin')
      }
      else{
        if(req.body.password === req.body.confirm && req.body.secret === admin.secret){
          admin.password = hashpassword
          admin.save()

          var transport = nodemailer.createTransport({
            service:'Gmail',
            auth:{
              user:'otitojuoluwapelumi@gmail.com',
              pass:process.env.GMAILPASS
            }
          })
          var mailOptions = {
            
          }
        }
      }
    })
  }

  //GET ALL ADMIN
  exports.getAllAdmin = async (req, res) => {
    const allAdmin = await admin.find();
    res.json(allAdmin)
  }
  //delete
  exports.deleteAdmin = async (req, res) => {
    const Delete = await admin.findByIdAndRemove(req.params.id)
    res.json(Delete)
  }
  //Update profile
  exports.updateProfile = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    admin.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, admin) => {
      if(err){
        res.status(403).json({
          message:'unable to complete update'
        })
      }
      else{
        admin.password = hashpassword
        admin.save()
        res.status(200).json({
          message:'update successful',
          Admin:admin
        })
      }
    })
  }