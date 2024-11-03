const error_handler = require('./error_middleware')

const before = []

// register your  middleware here
const after = [
    error_handler
]

module.exports = {
    before,
    after,
}
