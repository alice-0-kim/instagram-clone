const express = require('express')

const router = express.Router()
const auth = require('./auth')
const user = require('./user')
const image = require('./image')

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/me', (req, res) => res.status(200).json(req.user))

router.use('/auth', auth)
router.use('', user)
router.use('', image)

module.exports = router
