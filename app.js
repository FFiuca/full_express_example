const env = require('./configs/env')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const guest_router = require('./routes/guest')
const user_router = require('./routes/user')

const bootsrap = require('./core/bootsrap')

const {error_handler} = require('./middlewares/error_middleware')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI+'/'+process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected'))
.catch((err)=> console.log(err))

// ini konsepnya middleware gk kayak go fiber atau wrapper python yang punya before after logic. di express tergantung posisi set  app.use nya dimana, misal app.user(error_handler), dia sebagai after logic
app.use('/lnk/be/guest', guest_router)
app.use('/lnk/be/user', user_router)

app.use(error_handler)

module.exports = app
