const express = require('express')

const router = express.Router()
const path = require('path')
const auth = require('./auth')
const user = require('./user')
const image = require('./image')

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
})

router.use('/auth', auth)
router.use('/user', user)
router.use('/image', image)

module.exports = router
