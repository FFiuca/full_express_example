const express = require('express')
const path = require('path')
const multer = require('multer')
const {new_multer} = require('../configs/multer')

const auth_controller = require('../controllers/auth_controller')
const file_controller = require('../controllers/file_controller')
const App = require('../app.js')

const router = express.Router()
router.get('/', async (req, res)=>{
    return res.send('Hello')
})

// const auth_router = express.Router()
router.post('/auth/register', auth_controller.register)
router.post('/auth/login', auth_controller.login)

// router.post('/file/single', , file_controller.single_upload)


// App.use('/auth', auth_router)

// serve static files
router.use('/static', express.static('storages/'))

const upload = multer({dest:'storages/'})
router.post('/file/upload', upload.single('avatar'), function(req, res, next){
    console.log(req.file, req.files)

    res.sendStatus(200)
})
router.post('/file/upload/multi', upload.array('avatar', 10), function(req, res, next){
    console.log(req.file, req.files)

    res.sendStatus(200)
})
const cpUpload = [
    {name:'avatar', maxCount:10},
    {name:'gallery', maxCount:10},
]
router.post('/file/upload/multi2', upload.fields(cpUpload), function(req, res, next){
    console.log(req.file, req.files)

    res.sendStatus(200)
})

const cpUpload2 = new_multer(true, 'avatar')
router.post('/file/upload/multi3', cpUpload2, function(req, res, next){
    console.log(req.file, req.files)

    res.sendStatus(200)
})

const cpUpload3 = new_multer(false)
router.post('/file/upload/multi4', cpUpload3, function(req, res, next){
    console.log(req.file, req.files)

    res.sendStatus(200)
})


module.exports = router
