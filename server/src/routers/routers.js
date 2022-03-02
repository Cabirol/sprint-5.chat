const express = require('express');
const User = require('../models/user.js');
const Room = require('../models/room.js');
const auth = require('../middlewares/auth.js');

const router = new express.Router();

router.post('/users', async (req, res)=>{
    try{
        const user = new User({name: req.body.name});
        if (req.body.password.trim().length<7 || !req.body.name){
            return res.status(400).json({
                errors: true, 
                message:'user name and password needed. Password must be at least 7 characters long'});
        }
        const token = await user.generateAuthToken(req.body.password);
        res.status(201).json({user, token});
    } catch (e){
        res.status(400).json(e);
    }
});

router.post('/users/login', async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.name, req.body.password);
        token = user.token;
        res.status(200).json({user, token});
    }catch(e){
        res.status(400).json({errors: e.message});
    }
});

//Obtenir usuari
router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user);
});

//Crear nova sala
router.post('/users/me/rooms', auth, async (req, res)=>{
    const room = new Room(req.body);
    try{
        await room.save();
        res.status(201).json(room);
    }catch(e){
        res.status(400).json(e);
    }
});

//array d'objectes {nomSala, nombresUsuarisconnectats} descendent
router.get('/users/me/rooms', auth, async (req, res)=>{
    try{
        const rooms = await Room.find({},{_id:0,__v:0});
        const populatedRooms = [];
        for (const room of rooms){
            const numUsers = await User.find({room:room.name}).count();
            const populatedRoom = {name:room.name, numUsers};
            populatedRooms.push(populatedRoom);
        }
        res.status(200).json(populatedRooms.sort((a, b) => {
            return b.numUsers - a.numUsers
        }));
    }catch(e){
        res.status(400).json(e);
    }
});

//donada una sala, l'afegeix a l'usuari
router.patch('/users/me/rooms', auth, async(req,res)=>{
    req.user.room = req.body.room;
    try{
        await req.user.save();
        res.status(201).json(req.user);
    } catch(e){
        res.status(400).json(e);
    }
});

module.exports = router;