const router = require('express').Router()


const auth = require('./auth')
const manage = require('./manage')
router.use('/auth', auth)
router.use('/manage', manage)


module.exports = router