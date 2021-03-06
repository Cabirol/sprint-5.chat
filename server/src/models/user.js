const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 10
    },
    token: {
        type: String
    },
    room: {
        type: String,
        trim: true,
        maxlenght: 10,
    },
    socket: {
        type: String
    }

});

userSchema.methods.generateAuthToken = async function(password){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, password);
    user.token = token;
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async (name, password)=>{

    const user = await User.findOne({ name });
    if (!user) {
        throw new Error('Unable to login');
    }
    const decoded = jwt.verify(user.token, password);
    if (!decoded){
        throw new Error('Unable to login');
    }
    const matchUser = await User.findOne({_id: decoded._id, token: user.token});
    if (!matchUser) {
        throw new Error('Unable to login');
    }
    return matchUser;
}

const User = mongoose.model('User', userSchema);

module.exports = User;