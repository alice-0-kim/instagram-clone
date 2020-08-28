const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(), limits: {filesize: 1000 * 1000 * 12},
})

router.post('/', upload.single('myImage'), async (req, res) => {
    console.log(req.file);
    const result = await query(req.file.buffer);
    if (result.error) {
        return res.status(404).json({
            err: result.error,
            message: result.error.message,
        })
    }
    console.log(result);
    const detections = result.safeSearchAnnotation;
    nsfwResult = nsfwChecker(detections);
    if (nsfwResult.length === 0) {
        console.log(true);
        return res.status(200).json({
            isSafe: true,
        });
    } else {
        console.log(false);
        return res.status(200).json({
            isSafe: false,
            message: `${nsfwResult.map(x => x[0]).join(', ')}`
        })
    }
});

async function query(buffer) {
  const vision = require('@google-cloud/vision');
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.safeSearchDetection(buffer);
  
  return result;
}

function nsfwChecker(result) {
    const arr = Object.entries(result);
    return arr.filter(elem => elem[1] === "VERY_LIKELY");
}

module.exports = router;