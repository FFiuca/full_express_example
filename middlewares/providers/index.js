// this is to register all provider

const express = require('express')
const cors = require('cors')
const response_time = require('response-time')
const compression = require('compression')
const morgan = require('../../configs/morgan')

// register your provider here
const before = [
    cors(),
    express.json(),
    response_time(),
    compression(),
    morgan(),
]

const after = [

]

console.log('provider', before)

module.exports = { before, after }

