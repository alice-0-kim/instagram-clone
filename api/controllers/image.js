const path = require('path')
const AWS = require('aws-sdk')

const Image = require('../models/image')

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
    const nsfwResult = nsfwChecker(safeSearch)
    if (nsfwResult.length !== 0) {
        return res.status(200).json({
            isSafe: false,
            message: `${nsfwResult.map(x => x[0]).join(', ')}`,
        })
    }
    const params = {
        Bucket: 'akhl',
        Key: `images/${new Date().valueOf() + path.extname(req.file.originalname)}`,
        ACL: 'public-read',
        Body: req.file.buffer,
    }
    try {
        const data = await s3.upload(params).promise()
        const imageParam = {
            imageUrl: data.Location,
            face,
            label,
            author: { id: req.user?._id },
        }
        console.log(imageParam);
        const image = new Image(imageParam)
        if (!image) {
            return res.status(400).json({ success: false, error: err })
        }
        await image.save()
        return res.status(201).json({
            success: true,
            id: image._id,
            message: 'Image created!',
        })
    } catch (err) {
        return res.status(400).json({
            error,
            message: 'Image not created!',
        })
    }
}

async function query(buffer) {
    const vision = require('@google-cloud/vision')
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

function nsfwChecker(result) {
    const arr = Object.entries(result)
    return arr.filter(elem => elem[1] === 'VERY_LIKELY')
}

updateImage = (req, res) => {

}

deleteImage = (req, res) => {

}

getImages = (req, res) => {

}

getImageById = (req, res) => {

}

module.exports = {
    createImage,
    updateImage,
    deleteImage,
    getImageById,
    getImages,
}
