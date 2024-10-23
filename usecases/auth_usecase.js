const { create_user, check_has_exist_by_username, user_filter, user_find_by_username, check_hash } = require('../services/auth_service')
const jwt = require('jsonwebtoken')

exports.register = async (data) => {
    if (await check_has_exist_by_username(data.username))
        throw new Error("Username already exist")

    return await create_user(data)
}

exports.login = async (username, password) => {
    // console.log(username, password)
    const user = await user_find_by_username(username)
    if (!user){
        throw new Error('Username doesn\'t exist')
    }
    console.log(user.id)
    if (!check_hash(user.password,  password)){
        throw new Error('Password wrong')
    }

    const token = jwt.sign(
        {
            user_id : user.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    )

    // harusnya disini tembak api kong jwt

    return {
        token,
    }
}
