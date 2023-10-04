const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    userName: {
        required: true,
        type: String, 
        trim: true
    },

    userEmail: {
        required: true,
        type: String, 
        trim: true
    },

    userPassword: {
        required: true,
        type: String, 
        trim: true
    },

    userImage: {
        type: String
    },

    totalOrders: {
        type: Number
    },

    lastLoggedIn:{
        type: mongoose.SchemaTypes.Date
    }
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User;