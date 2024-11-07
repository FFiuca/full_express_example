const Approval = require('../models/approval_model')
const mongoose = require('mongoose')

exports.create_approval = async(user_id, {
    request_reason
})=>{
    const new_approval = new Approval({
        user: user_id,
        request_reason,
    })

    const approval = await new_approval.save()
    return approval
}

exports.approve_approval = async(id)=>{
    const session = await mongoose.startSession()
    session.startTransaction()

    const approval = await Approval.findById(id)

    approval.status = 'approved'
    approval.updated_at = Date.now()

    await approval.save()
    await session.commitTransaction()

    return approval
}

exports.reject_approval = async(id)=>{
    const approval = await Approval.findById(id)

    approval.status = 'rejected'
    approval.updated_at = Date.now()

    await approval.save()
    return approval
}

exports.approval_get = async({
    user,
    status,
})=>{
    let param = {}
    if (user!=undefined){
        param.user = user
    }
    if (status!=undefined){
        param.status = status
    }

    return await  Approval.find(param).sort({created_at: -1}).populate('user', 'username name status_active created_at updated_at').exec()
}
