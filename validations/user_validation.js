const {body} = require('express-validator')

const user_validation_rules = [
    body('username').notEmpty().isString().isLength({min:4}),
    body('name').notEmpty().isString().isLength({min:3}),
    body('password').notEmpty().isAlphanumeric().isLength({min:6}),
    body('password_confirm').notEmpty().custom((value, {req}) => {
        console.log('wkwk',req, value)
        if (value !== req.body.password) {
            throw new Error('Password must match')
            // return false
        }

        return true
    }),
]

const login_validation_rules = [
    body('username').notEmpty(),
    body('password').notEmpty(),
]

module.exports = {
    user_validation_rules,
    login_validation_rules
}
