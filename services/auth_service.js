const User = require('../models/user_model')
const bcrypt = require('bcryptjs')

exports.create_user = async ({
    username,
    name,
    password,
})=>{
    const newUser = new User({
        username,
        name,
        password: await hash_password(password),
        created_at: new Date(),
        updated_at: new Date(),
        status_active: true
    })
    console.log(newUser)

    const user = await newUser.save()
    return user
}

const hash_password = async (password)=>{
    return await bcrypt.hash(password, 10)
}

exports.check_hash = async (hash, password)=>{
    return await bcrypt.compare(password, hash)
}

exports.check_has_exist_by_username = async(username)=>{
    // const users = await  User.find({username})
    const count = await User.countDocuments({username})

    return count>0
}

exports.user_find_by_username = async(username)=>{
    const users = await  User.findOne({username})

    return users
}

exports.user_filter =  async ({
    username,
    name,
    status_active,
    created_at
})=>{
    let param = {}
    if (username!=undefined){
        param.username = username
    }
    if (name!=undefined){
        param.name = {
            $regex: name
        }
    }
    if  (status_active!=undefined){
        param.status_active = status_active
    }
    if (created_at!=undefined){
        param.created_at = {
            $gte: new Date(created_at),
            $lte: new Date(created_at),
        }
    }

    let data = await User.find(param)
    data =  data.map((e)=>({
        _id :  e._id,
        username : e.username,
        name: e.name,
        status_active: e.status_active,
        created_at: e.created_at,
        updated_at: e.updated_at,
        deleted_at: e.deleted_at
    }))

    return data
}

