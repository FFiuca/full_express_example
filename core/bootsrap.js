// this is to load all configs
const env = require('../configs/env')
const settings = require('../configs/settings')
const sequelize = require('../configs/db/sequalize_mysql')
const mongoose = require('../configs/db/mongoose')
// const mongo_client = require('../configs/db/mongodb')
const redis = require('../configs/db/redis')
const ioredis = require('../configs/db/ioredis')

// job
const bullmq_job = require('../queues/jobs')
// worker
const bullmq_worker = require('../queues/workers')

console.log(process.env.TZ, new Date().toString())
