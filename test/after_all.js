const sequelize =  require('../configs/db/sequalize_mysql')
const mongoose = require('mongoose');
const mongo_client = require('../configs/db/mongodb')

exports.close_sequelize = ()=>{
    sequelize.close()
}

exports.close_mongoose = ()=>{
    mongoose.disconnect()
}

exports.close_mongodb = ()=>{
    mongo_client.close()
}

exports.init = ()=>{
    this.close_mongodb()
    this.close_mongoose()
    this.close_sequelize()
}
