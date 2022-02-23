const express = require('express');
const User = require('../models/user.js');
const Room = require('../models/room.js');
const auth = require('../middlewares/auth.js');

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
        res.status(200).json({user, token});
    }catch(e){
        res.status(400).json(e);
    }
});

//agafar el teu usuari i afegir-lo a nova sala
router.post('/users/me', auth, async (req, res)=>{
    const room = new Room(req.body);
    try{
        await room.save();
        req.user.room = room.name;
        res.status(201).json({user, room});
    }catch(e){
        res.status(400).json(e);
    }
});

router.get('/users/me/rooms', async (req, res)=>{
    try{
        const users = await User.find().select({ name: 1, room: 1 });
        const rooms = [];
        for (const user in users){
            if (user.room){
                rooms.push({room: user.room});
            }
        }
        res.status(200).json(rooms);
    }catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;