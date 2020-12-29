const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const AWS = require('aws-sdk')

const auth = require('./auth')
const user = require('./user')
const image = require('./image')

const User = require('../models/user')
const { ObjectId } = require('../controllers/util')
const isAuthenticated = require('../utils/isAuthenticated')
const upload = multer({
    storage: multer.memoryStorage(), limits: { filesize: 1000 * 1000 * 12 },
})
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-west-2',
})

require('dotenv').config({ path: path.join(__dirname, '../controllers/.env.local') })

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/me', (req, res) => {
    User.findOne({ username: req.user?.username }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, user })
    }).catch(err => err)
})

router.put('/me', isAuthenticated, upload.single('myImage'), async (req, res) => {
    const user = req.body

    if (!user) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    if (req.file) {
        try {
            const res = await s3.upload({
                Bucket: 'akhl',
                Key: `images/${new Date().valueOf() + path.extname(req.file.originalname)}`,
                ACL: 'public-read',
                Body: req.file.buffer,
            }).promise()
            user.imageUrl = res.Location
        } catch (err) {
            return res.status(400).json({ err, message: err.message })
        }
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
