const req = require('express/lib/request');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

   
   // const parts = authHeader.split(' ');

   // const [scheme, token] = parts;



    jwt.verify(authHeader , authConfig.secret, (err, decoded) => {
        if(err){
            console.log(err)
            return res.status(401).send({"message": "jwt malformed"});
        }

        req.userId = decoded.id;

        return next();
    })

    

};