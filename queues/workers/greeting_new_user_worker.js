const bullmq =  require('bullmq');
const ioredis  = require('../../configs/db/ioredis');
// const ioredis = require('ioredis')
const greeting_queue = require('../jobs/greeting_new_user_queue')

const worker = new bullmq.Worker(
    greeting_queue.greeting_new_user.name,
    async  (job) => {
        console.log('[bullmq worker] send greeting successfull', job)
    },
    {
        // connection: new ioredis({ host: 'localhost', port: 6379})
        connection: ioredis,
    }
)

worker.on('failed', async(job, err)=>{
    console.log('[bullmq worker] send greeting error', job, err)
})

worker.on('completed', async(job, err)=>{
    console.log('[bullmq worker] send greeting completed', job, err)
})

module.exports = {
    greeting_new_user_worker: worker
}
