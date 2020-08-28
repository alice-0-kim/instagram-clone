const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local')});
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(), limits: { filesize: 1000 * 1000 * 12 },
})

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: 'us-west-2'
})

router.post('/', upload.single('myImage'), async (req, res) => {
    const result = await query(req.file.buffer);
    if (result.error) {
        return res.status(404).json({
            err: result.error,
            message: result.error.message,
        })
    }
    const safeSearch = result.safeSearchAnnotation;
    const face = result.faceAnnotations;
    const label = result.labelAnnotations;
    const nsfwResult = nsfwChecker(safeSearch);
    if (nsfwResult.length !== 0) {
        console.log(false);
        return res.status(200).json({
            isSafe: false,
            message: `${nsfwResult.map(x => x[0]).join(', ')}`
        })
    }
    const params = {
        'Bucket':'akhl',
        'Key': `images/${new Date().valueOf() + path.extname(req.file.originalname)}`,
        'ACL':'public-read',
        'Body': req.file.buffer
    }
    
    s3.upload(params, function(err, data) {
        console.log(err);
        console.log(data);
        const url = data.Location;
    })

    // TODO: send it with queried data into the DB (url, face, label, safeSearch)
    
});

async function query(buffer) {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const request = {
    image: {content: buffer},
    features: [
        {type: 'FACE_DETECTION'},
        {type: 'SAFE_SEARCH_DETECTION'},
        {type: 'LABEL_DETECTION'},
    ],
  };
  const [result] = await client.annotateImage(request);
  return result;
}

function nsfwChecker(result) {
    const arr = Object.entries(result);
    return arr.filter(elem => elem[1] === "VERY_LIKELY");
}

module.exports = router;
