const express = require('express')
const router = express.Router()
//import controllers
// const {requireSignIn} = require('../controllers/auth')
const { requireSignIn } = require('../controllers/auth')

const {read , update} = require('../controllers/user')

router.get('/user/:id', requireSignIn, read)
router.put('/user/update', requireSignIn, update)


module.exports = router