require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const guest_router = require('./routes/guest')
const user_router = require('./routes/user')

const {error_handler} = require('./middlewares/error_middleware')

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected'))
.catch((err)=> console.log(err))

// ini konsepnya middleware gk kayak go fiber atau wrapper python yang punya before after logic. di express tergantung posisi set  app.use nya dimana, misal app.user(error_handler), dia sebagai after logic
app.use('/guest', guest_router)
app.use('/user', user_router)

app.use(error_handler)

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
