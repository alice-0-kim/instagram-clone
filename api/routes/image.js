const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(), limits: { filesize: 1000 * 1000 * 12 },
})

const s3 = new AWS.S3({
    accessKeyId: 'AKIAITLEL4KGBDKMA35A',
    secretAccessKey: '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',
    region: 'us-west-2'
})

const param = {
    'Bucket':'akhl',
    'Key': 'image/' + 'logo',
    'ACL':'public-read',
    'Body':'Buffer',
    'ContentType':'image/png'
}

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

    // TODO: store buffer image into the DB with queried data
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
