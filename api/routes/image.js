const express = require('express')
const path = require('path')
const multer = require('multer')
require('dotenv').config({ path: path.join(__dirname, '.env.local') })

const router = express.Router()
const ImageCtrl = require('../controllers/image')

const upload = multer({
    storage: multer.memoryStorage(), limits: { filesize: 1000 * 1000 * 12 },
})

router.post('/', upload.single('myImage'), ImageCtrl.createImage)

module.exports = router
