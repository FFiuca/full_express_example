const redis = require('ioredis')

const host = process.env.REDIS_HOST || '127.0.0.1'
const port = process.env.REDIS_PORT || '6379'

const client = new redis({
    host : host,
    port : port,
    maxRetriesPerRequest: null, // for bullmq must null
})

module.exports = client

console.log('[ioredis] ioredis connected')
