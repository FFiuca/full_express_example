const redis = require('redis')

const host = process.env.REDIS_HOST || '127.0.0.1'
const port = process.env.REDIS_PORT || '6379'

const client =  redis.createClient({
    url: `redis://${host}:${port}`
})

async function connect(){
    try{
        await client.connect()
        console.log('[redis] connect success')
    }catch(e){
        console.error('[redis] connect error', e)
    }
}

connect()

module.exports = client

