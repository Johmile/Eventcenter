const jwt = require('jsonwebtoken');
const config = require('../../configuration/config');
const user = require('../models/User');

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.json({
            message:`No token provided`,
            auth:false,
            token:null
        })
    }
    else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({
                    message:`Error authenticating token`,
                    auth:false,
                    token:false
                })
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
}
module.exports = verifyToken;
// ANOTHER WAY TO VERIFY TOKEN
// try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, config.secret)
//     req.user = decoded;
//     next()
// }
// catch (error){
//     res.json({
//         message:`Auth failed`
//     })
// }