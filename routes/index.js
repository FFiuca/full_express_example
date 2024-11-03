const express = require('express')
const router = express.Router()

const guest = require('./guest')
const user = require('./user')

const middleware = require('../middlewares')
const provider = require('../middlewares/providers')

if(Array.isArray(provider.before)){
    provider.before.forEach((el) => {
        router.use(el)
    })
}

if(Array.isArray(middleware.after)){
    middleware.after.forEach((el) => {
        router.use(el)
    })
}

router.use('/guest', guest)
router.use('/user', user)

if (Array.isArray(middleware.before)){
    middleware.before.forEach(el=>{
        router.use(el)
    })
}

if(Array.isArray(provider.after)){
    provider.after.forEach((el) => {
        router.use(el)
    })
}

module.exports = router
