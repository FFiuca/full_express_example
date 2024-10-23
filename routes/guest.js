const express = require('express')

const auth_controller = require('../controllers/auth_controller')
const App = require('../app')

const router = express.Router()
router.get('/', async (req, res)=>{
    return res.send('Hello')
})

// const auth_router = express.Router()
router.post('/auth/register', auth_controller.register)
router.post('/auth/login', auth_controller.login)


// App.use('/auth', auth_router)

module.exports = router
