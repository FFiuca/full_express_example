// this is to register all middleware

const error_handler = require('./error_middleware')

const before = [
    error_handler, // for catching error. so express will treat this as default error handler at the end of middleware execution. so we doesn't
]

// register your  middleware here
const after = [
    // error_handler, // for catching error
]

module.exports = {
    before,
    after,
}
