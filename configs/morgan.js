const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const settings = require('../configs/settings')

// const m = ()=> morgan('combined') // default print to console

const accessLogStream = fs.createWriteStream(path.join(settings.static_root_absolute, 'log', 'access.log'), { flags: 'a' })

const m = ()=> morgan('combined', {
    stream: accessLogStream
})

module.exports = m
