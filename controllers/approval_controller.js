const { validationResult } = require('express-validator')
const {
    approve,
    get,
    reject,
    create,
} = require('../usecases/approval_usecase')
const approval_validation  = require('../validations/approval_validation')

exports.create_approval = async (req, res, next)=>{
    console.log('sini1', req.user_id)

    await Promise.all(approval_validation.request_approval_validation_rules.map(validation=> validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log('sini1.5', req.body)
        return res.status(400).json({ data : { error: errors.array() }})
    }
    console.log('sini2', req.body)

    try{
        const data = req.body

        const approval = await create(req.user_id, data)
        console.log('sini3')

        return res.status(201).json({data : approval})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}

exports.approve_approval = async (req, res, next)=>{
    console.log('sini1')

    try{
        const approval = await approve(req.params.id)
        console.log('sini3')

        return res.status(201).json({data : approval})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}

exports.reject_approval = async (req, res, next)=>{
    console.log('sini1')

    try{
        const approval = await reject(req.params.id)
        console.log('sini3')

        return res.status(201).json({data : approval})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}


exports.get_approval = async (req, res, next)=>{
    console.log('sini2', req.body)

    try{
        const param = req.query

        const approval = await get(param)
        console.log('sini3')

        return res.status(200).json({data : approval})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}
