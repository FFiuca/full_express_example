const dotenv = require('dotenv');

if (process.env.NODE_ENV == "test"){
    dotenv.config({
        path: './.env.test',
    })
}else{
    dotenv.config()
}

// console.log(process.env.NODE_ENV, process.env.MONGO_URI, process.env.MONGO_DB)
