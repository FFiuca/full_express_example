const { Queue } = require('bullmq')
const ioredis = require('../../configs/db/ioredis')

const queue = new Queue('greetingNewUserQueue', {
    connection: ioredis,
},)

async function add_job_send_greeting_new_user(data = {user_id,}){
    await queue.add('send_greeting_new_user', data, {
        attempts: 3,
        backoff:{
            type: 'exponential',
            delay: 5000
        },
    })
}

module.exports = {
    greeting_new_user: queue,
    add_job_send_greeting_new_user,
}

console.log(queue.name)

// const run = async()=>{
//     await add_job_send_greeting_new_user({user_id:1})
// }
// run()

