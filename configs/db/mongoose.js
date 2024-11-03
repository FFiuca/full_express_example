const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI+'/'+process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log('MongoDB Connected'))
.catch((err)=> console.log(err))

module.exports = mongoose


