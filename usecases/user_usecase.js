const {user_filter} = require('../services/auth_service')

exports.user_get = async (param)=>{
    let data =  await user_filter(param)

    return data
}
