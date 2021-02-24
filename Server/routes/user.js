const express = require('express')
const router = express.Router()
//import controllers
// const {requireSignIn} = require('../controllers/auth')

const {read} = require('../controllers/user')

router.get('/user/:id', read)


module.exports = router