const {
    approval_get,
    create_approval,
    reject_approval,
    approve_approval,
} = require('../services/approval_service')

exports.create = async(user_id, data)=>{
    return await create_approval(user_id, data)
}

exports.approve = async(user_id)=>{
    return await approve_approval(user_id)
}

exports.reject = async(user_id)=>{
    return await reject_approval(user_id)
}

exports.get = async(param)=>{
    return await approval_get(param)
}
