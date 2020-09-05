const express = require('express')
const path = require('path')

const router = express.Router()
const auth = require('./auth')
const user = require('./user')
const image = require('./image')

const User = require('../models/user')
const ObjectId = require('../controllers/helper')
const isAuthenticated = require('../utils/isAuthenticated')

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/me', (req, res) => res.status(200).json(req.user))

router.put('/me', isAuthenticated, async (req, res) => {
    const user = req.body
    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    User.findByIdAndUpdate(ObjectId(req.user._id), user, (err, user) => {
        if (!user) {
            return res.status(404).json({ err, message: 'User not found!' })
        }
        return res.status(200).json({ success: true, id: user._id, message: 'User updated!' })
    })
})

router.get('/set', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

router.use('/auth', auth)
router.use('', user)
router.use('', image)

module.exports = router
