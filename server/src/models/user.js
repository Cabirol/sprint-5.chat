const mongoose = require('mongoose');
//const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const Message = require('./message.js');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    },
    room: {
        type: String,
        trim: true,
        maxlenght: 10,
        default: ''
    },
    token: {
        type: String,
        required: true
    }

});

userSchema.virtual('messages',{
    ref: 'Message',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'tortugues');
    user.token = token;
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (name, password)=>{

    const user = await User.findOne({ name });

    if (!user) {
        throw new Error('Unable to login');
    }

    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;