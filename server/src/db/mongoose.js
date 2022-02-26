const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Cabirol-chat');

const User = require('../models/user.js');

User.findOneAndUpdate({
    name: 'Admin'
}, {
    name: 'Admin',
    password: '1234567'
}, {
    upsert: true,
    new: true
}, (error, result)=>{
    if (error) return error;
    console.log('Connected to database');
});

//TODO què fem amb l'admin?