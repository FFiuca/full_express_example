const { MongoClient } = require('mongodb')

let client

const connect = async()=>{
    const url = process.env.MONGO_URI;
    try{
        client = new MongoClient(url)
        await client.connect()

        console.log('[mongodb] connected')
    }catch(e){
        console.error('[mongodb] error to connect', e)
    }
}

connect()

module.exports = client
