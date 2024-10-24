const {user_get:user_get_uc } = require('../usecases/user_usecase')

const user_get = async (req, res, next) =>{
    const param = req.query

    try{
        const data = await user_get_uc(param)
        console.log('sini3')

        return res.status(200).json({data : data})
    }catch(error){
        console.log('sini4')
        next(error)
    }
}

module.exports = {
    user_get
}
