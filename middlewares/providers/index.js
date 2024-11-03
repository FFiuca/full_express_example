const express = require('express')
const cors = require('cors')

// register your provider here
const before = [
    cors(),
    express.json()
]

const after = [

]

console.log('provider', before)

module.exports = { before, after }

