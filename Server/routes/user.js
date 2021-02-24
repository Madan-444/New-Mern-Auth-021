const express = require('express')
const router = express.Router()
//import controllers
// const {requireSignIn} = require('../controllers/auth')
const { requireSignIn,adminMiddleWare } = require('../controllers/auth')

const {read , update} = require('../controllers/user')

router.get('/user/:id', requireSignIn, read)
router.put('/user/update', requireSignIn,update)
router.put('/admin/update', requireSignIn,adminMiddleWare, update)


module.exports = router