const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true,
        unique : false
    },
    password : {
        type : String,
        required : true,
    },
    status_active : {
        type: Boolean,
        default : true
    },
    created_at : {
        type : Date,
        default: Date.now,
    },
    updated_at : {
        type : Date,
        default: Date.now
    },
    deleted_at : {
        type : Date,
        default: null
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User
