require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const errorHandler = require('./handlers/errorhandler')
const router = require('./routes/routes')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use( cors())
app.use('/', router);

//app.use(errorHandler.notFound);

// production error handler
app.use(errorHandler.productionErrors);

if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandler.developmentErrors);
}
app.get('/', (req, res) => {
    res.send(`<h1>Event center server</h1>`)
})
// port connection
const port = 1000;
app.listen(port, () => {
    //DATABASE CONNECTION
    mongoose.connect('mongodb://localhost/customer')
    // mongoose.connect('mongodb://johnmax147:sci15csc067@ds125680.mlab.com:25680/customer');
    console.log(`Event center is listening to ${port}`)
})


