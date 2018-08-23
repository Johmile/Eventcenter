require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer')
const router = require('./routes/routes')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
app.use('/images',express.static('./images'))
// var AuthController = require('./auth/AuthController');
// app.use('/api/auth', AuthController);


app.get('*', (req, res) => {
    res.send(`<h1>404 ERRor, page not found</h1>`)
    console.log(`404 ERROR,PAGE NOT FOUND`)
})
// port connection
const port = 1000;
app.listen(port, () => {
    //DATABASE CONNECTION
    mongoose.connect('mongodb://localhost/customer')
    // mongoose.connect('mongodb://johnmax147:sci15csc067@ds125680.mlab.com:25680/customer');
    console.log(`Event center is listening to ${port}`)
})


