// this is to load all configs
const env = require('../configs/env')
const settings = require('../configs/settings')
const sequelize = require('../configs/db/sequalize_mysql')
const mongoose = require('../configs/db/mongoose')
// const mongo_client = require('../configs/db/mongodb')

console.log(process.env.TZ, new Date().toString())
