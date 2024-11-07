const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
// import mongoose from 'mongoose'

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
},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

// handle soft delete in mongoose. only apply in find query
// must use function declaration, can't ()=>{}. due need access this props
userSchema.pre('find', function(next, options){
    console.log('pre find', this instanceof mongoose.Query);
    this.where({
        deleted_at: null
    })

    next()
})

const User = mongoose.model('users', userSchema)
module.exports = User
