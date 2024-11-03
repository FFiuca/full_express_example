const { execSync } = require('child_process')

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

exports.init = ()=>{
    this.migration_drop()
    this.migration_db_create()
    this.migration_db_up()
    this.seed_master()
}

// module.exports = {
//     migration_drop,
//     migration_db_create,
//     migration_db_up,
//     seed_master,
// }
