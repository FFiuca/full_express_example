const express = require('express')
const router = express.Router()
const auth_handler = require('../middlewares/auth_middleware')
const user_controller = require('../controllers/user_controller')
const approval_controller = require('../controllers/approval_controller')

router.use(auth_handler)

router.get('/', async (req, res)=>{
    return res.status(200).json({
        data : {
            user_id :  req.user_id,
        }
    })
})

router.get('/user', user_controller.user_get)

router.post('/approval',  approval_controller.create_approval)
router.get('/approval',  approval_controller.get_approval)
router.patch('/approval/:id/approve',  approval_controller.approve_approval)
router.patch('/approval/:id/reject',  approval_controller.reject_approval)


module.exports = router
