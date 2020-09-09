const path = require('path')
const AWS = require('aws-sdk')

const vision = require('@google-cloud/vision')
const Image = require('../models/image')
const User = require('../models/user')
const ObjectId = require('./helper')
const categoryCheck = require('../utils/categoryChecker')

require('dotenv').config({ path: path.join(__dirname, '.env.local') })

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-west-2',
})

createImage = async (req, res) => {
    const { body } = req
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an image',
        })
    }
    const result = await query(req.file.buffer)
    if (result.error) {
        return res.status(404).json({
            err: result.error,
            success: false,
            message: result.error.message,
        })
    }
    const safeSearch = result.safeSearchAnnotation
    const face = result.faceAnnotations
    const label = result.labelAnnotations
    const safeSearchResult = safeSearchChecker(safeSearch)
    if (safeSearchResult.length !== 0) {
        return res.status(200).json({
            isSafe: false,
            message: `${safeSearchResult.map(x => x[0]).join(', ')}`,
        })
    }
    const params = {
        Bucket: 'akhl',
        Key: `images/${new Date().valueOf() + path.extname(req.file.originalname)}`,
        ACL: 'public-read',
        Body: req.file.buffer,
    }
    const categories = categoryCheck(face, label)
    try {
        const data = await s3.upload(params).promise()
        const private = req.body.private === 'true'
        const imageParam = {
            imageUrl: data.Location,
            face,
            label,
            author: { id: req.user._id, username: req.user.username },
            private,
            categories,
        }
        const image = new Image(imageParam)
        if (!image) {
            return res.status(400).json({ success: false, error: err })
        }
        await image.save()
        await User.findByIdAndUpdate(ObjectId(req.user._id), {
            $push: {
                images: {
                    $each: [{
                        id: image._id.toString(),
                        createdAt: image.createdAt,
                    }],
                    $sort: { createdAt: -1 },
                }
            }
        })
        if (!private) {
            const categoryList = ['faces', 'animals', 'natures', 'foods', 'others']
            categoryList.forEach(param => {
                categorizer(image, param, req.user._id)
            })
        }
        return res.status(201).json({
            success: true,
            id: image._id,
            message: 'Image created!',
        })
    } catch (err) {
        return res.status(400).json({
            err,
            message: 'Image not created!',
        })
    }
}

async function query(buffer) {
    const client = new vision.ImageAnnotatorClient()
    const request = {
        image: { content: buffer },
        features: [
            {
                maxResults: 50,
                type: 'FACE_DETECTION',
            },
            {
                maxResults: 50,
                type: 'SAFE_SEARCH_DETECTION',
            },
            {
                maxResults: 50,
                type: 'LABEL_DETECTION',
            },
        ],
    }
    const [result] = await client.annotateImage(request)
    return result
}

function safeSearchChecker(result) {
    const arr = Object.entries(result)
    return arr.filter(elem => elem[0] !== 'spoof' && elem[1] === 'VERY_LIKELY')
}

async function categorizer(image, param, userId) {
    if (image.categories[param]) {
        await User.findByIdAndUpdate(ObjectId(userId), {
            $push: {
                [param]: image._id.toString(),
            },
        })
    }
}

updateImage = (req, res) => {

}

deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(ObjectId(req.params.id))
        if (!image) {
            return res.status(404).json({ success: false, error: 'Image not found' })
        }
        const user = await User.findByIdAndUpdate(ObjectId(image.author.id), {
            $pull: {
                images: { id: req.params.id },
                faces: req.params.id,
                foods: req.params.id,
                animals: req.params.id,
                natures: req.params.id,
                others: req.params.id,
            }
        })
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' })
        }
        return res.status(200).json({ success: true, image })
    } catch (err) {
        return res.status(400).json({ success: false, error: err })
    }
}

getImages = (req, res) => {
    Image.find({ private: false }, null, { sort: { createdAt: -1 } }, (err, images) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!images.length) {
            return res.status(404).json({ success: false, error: 'Image not found' })
        }
        return res.status(200).json({ success: true, images })
    }).catch(err => err)
}

getImageById = (req, res) => {
    Image.findById(ObjectId(req.params.id), (err, image) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!image) {
            return res.status(404).json({ success: false, error: 'Image not found' })
        }
        return res.status(200).json({ success: true, image })
    }).catch(err => err)
}

module.exports = {
    createImage,
    updateImage,
    deleteImage,
    getImageById,
    getImages,
}
