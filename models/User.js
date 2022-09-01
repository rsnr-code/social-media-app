 //Here, we will be creating a schema with all the different users

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

//Creating a model from our schema
const User = mongoose.model('User', UserSchema);

module.exports = User;