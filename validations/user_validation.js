const {body} = require('express-validator')

const user_validation_rules = [
    body('username').notEmpty().withMessage('Username is required').isString().isLength({min:4}).withMessage('Minimum 4 chars'),
    body('name').notEmpty().withMessage('Name is required').isString().isLength({min:3}).withMessage('Minimum 3 chars'),
    body('password').notEmpty().withMessage('Password is required').isLength({min:6}).withMessage('Minimum 6 chars'),
    body('password_confirm').notEmpty().withMessage('Password Confirm is required').custom((value, {req}) => {
        // console.log('wkwk',req, value)
        if (value !== req.body.password) {
            throw new Error('Password must match')
            // return false
        }

        return true
    }).withMessage('Password confirm must match'),
]

const login_validation_rules = [
    body('username').notEmpty(),
    body('password').notEmpty(),
]

module.exports = {
    user_validation_rules,
    login_validation_rules
}
