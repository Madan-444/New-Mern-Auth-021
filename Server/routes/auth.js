const express = require('express')
const router = express.Router()
//import controllers

const {signup,accountActivation,signin,forgotPassword,resetPassword,googleLogin} = require('../controllers/auth')

// import validators
const {userSignupValidator,userSignInValidator,forgotPasswordValidator,resetPasswordValidator} = require('../validators/auth')
const {runValidation} = require('../validators')

router.post('/signup', userSignupValidator,runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/signin', userSignInValidator,runValidation, signin)
// Forget and reset password Routes
router.put('/forgot-password', forgotPasswordValidator,runValidation, forgotPassword)
router.put('/reset-password', resetPasswordValidator,runValidation, resetPassword)

// Google and facebook routes
router.post('/google-login',googleLogin)

module.exports = router