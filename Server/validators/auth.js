const {check } = require("express-validator")

exports.userSignupValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Must be valid email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at leat 6 charects long')
    
]

exports.userSignInValidator = [
    check('email')
    .isEmail()
    .withMessage('Must be valid email address'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at leat 6 charects long')
    
]

exports.forgotPasswordValidator = [
    check('email')
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Must be valid email address')
    
]
exports.resetPasswordValidator = [
    check('newPassword')
    .not()
    .isEmpty()
    .isLength({min: 6})
    .withMessage('Password must be atleast 6 charecters')
    
]
