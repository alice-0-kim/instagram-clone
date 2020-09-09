const express = require('express')
const multer = require('multer')

const router = express.Router()
const ImageCtrl = require('../controllers/image')

const upload = multer({
    storage: multer.memoryStorage(), limits: { filesize: 1000 * 1000 * 12 },
})

router.post('/image', upload.single('myImage'), ImageCtrl.createImage)
router.delete('/image/:id', ImageCtrl.deleteImage)
router.get('/image/:id', ImageCtrl.getImageById)
router.get('/images', ImageCtrl.getImages)

module.exports = router
