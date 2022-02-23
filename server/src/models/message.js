const mongoose = require('mongoose');

const Message = mongoose.model('Message', {
    text: {
        type: String,
        required: true
    },date: { 
        type: Date, 
        default: Date.now 
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Room'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
});

module.exports = Message;