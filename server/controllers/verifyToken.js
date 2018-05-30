const jwt = require('jsonwebtoken');
const config = require('../config');

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
                req.userId = decoded.id;
                next();
            }
        })
    }
}
module.exports = verifyToken;