const { Sequelize } = require('sequelize');

const user = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST
const port = process.env.MYSQL_PORT
const database = process.env.MYSQL_DB

console.log('sqsqs',user, password, host)
const sequelize = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`)

async function test_connect(){
    try{
        await sequelize.authenticate()
        console.log('[MySQL] Connected to database')
    }catch(error){
        console.error('[MySQL] Unable to connect the database: ', error)
    }
}

test_connect()

module.exports = sequelize
