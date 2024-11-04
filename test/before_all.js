const { execSync } = require('child_process')
// const mongo_client = require('../configs/db/mongodb')

exports.migration_drop = ()=>{
    try{
        execSync("npx cross-env NODE_ENV=test sequelize-cli db:drop ")
        console.log('migration_db_drop success')
    }catch(e){
        console.error(e)
    }
}

exports.migration_db_create = ()=>{
    try{
        execSync("npx cross-env NODE_ENV=test sequelize-cli db:create")
        console.log('migration_db_create success')
    }catch(e){
        console.error(e)
    }
}

exports.migration_db_up = ()=>{
    try{
        execSync("npx cross-env NODE_ENV=test sequelize-cli db:migrate")
        console.log('migration_db_up success')
    }catch(e){
        console.error(e)
    }
}

exports.seed_master = ()=>{
    try{
        execSync("npx cross-env NODE_ENV=test sequelize-cli db:seed --seed 20241101071606-demo-user.js")

        console.log('seed_master success')
    }catch(e){
        console.error(e)
    }
}


exports.mongo_migrate_up = ()=>{
    try{
        execSync("npx cross-env NODE_ENV=test migrate-mongo up")

        console.log('mongo_migrate_up success')
    }catch(e){
        console.error(e)
    }
}

exports.mongo_migrate_down = async ()=>{
    try{
        // const db = mongo_client.db(process.env.MONGO_DB)

        // await db.dropDatabase()
        console.log('mongo_migrate_down success')
    }catch(e){
        console.error(e)
    }
}

exports.init = async ()=>{
    this.migration_drop()
    this.migration_db_create()
    this.migration_db_up()
    this.seed_master()

    // let handle by mongoose directly
    // await this.mongo_migrate_down()
    // this.mongo_migrate_up()
}

// module.exports = {
//     migration_drop,
//     migration_db_create,
//     migration_db_up,
//     seed_master,
// }
