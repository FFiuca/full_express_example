const dotenv = require('dotenv');
const express = require('express')
const mongoose = require('mongoose')
const guest_router = require('./routes/guest')
const user_router = require('./routes/user')

if (process.env.NODE_ENV == "test"){
    dotenv.config({
        path: './.env.test',
    })
}else{
    dotenv.config()
}
console.log(process.env.NODE_ENV, process.env.MONGO_URI, process.env.MONGO_DB)

const {error_handler} = require('./middlewares/error_middleware')

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI+'/'+process.env.MONGO_DB, {
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

module.exports = app
