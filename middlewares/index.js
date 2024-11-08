// this is to register all middleware

const error_handler = require('./error_middleware')

const before = [
    error_handler, // for catching error
]

// register your  middleware here
const after = [
    // error_handler, // for catching error

]

module.exports = {
    before,
    after,
}
