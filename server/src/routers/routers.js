const express = require('express');
const User = require('../models/user.js');
//const auth = require('../middleware/auth.js');

const router = new express.Router();

router.post('/users', async (req, res)=>{

    const user = new User(req.body);
    try{
        const token = await user.generateAuthToken();
        res.status(201).json({user, token});
    } catch (e){
        res.status(400).json(e);
    }
});

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.name, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;