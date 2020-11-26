import jwt from 'jsonwebtoken';
import express from 'express';
const KeyToken = express.Router();


KeyToken.use(function(req,res,next){
    var token = req.headers['x-access-token'];
    
    if(!token){
        return res.status(403).json({auth:false, message: "Sin Token"});
    }

    jwt.verify(token,'mlm2020', function(err, decoded){
        if(err){
            return res.status(401).json({auth:false, message:"Usuario no autorizado"});
        }

        req.body.id = decoded.id;
       // req.body.username = decoded.username;
        next();

    })
})
module.exports = KeyToken;