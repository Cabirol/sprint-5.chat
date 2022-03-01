const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const user = await User.findOne({token});

        if (!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();

    }catch(e){
        res.status(401).send({error: 'Please authenticate'});
    }
}

module.exports = auth;