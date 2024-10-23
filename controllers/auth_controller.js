const { validationResult } = require('express-validator')
const { register, login } = require('../usecases/auth_usecase')
const {user_validation_rules, login_validation_rules} = require('../validations/user_validation')

exports.register = async (req, res, next) => {
    console.log('sini1')

    await Promise.all(user_validation_rules.map(validation=> validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log('sini1.5', req.body)
        return res.status(400).json({ data : { error: errors.array() }})
    }
    console.log('sini2', req.body)

    try{
        const data = req.body

        const user = await register(data)
        console.log('sini3')

        return res.status(201).json({data : user})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}

exports.login = async (req, res, next)=>{
    await Promise.all(login_validation_rules.map(e=> e.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        console.log('sini1.5', req.body)
        return res.status(400).json({ data : { error: errors.array() }})
    }

    try{
        const data = req.body

        const token = await login(req.body.username, req.body.password)
        console.log('sini3')

        return res.status(201).json({data : token})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}


