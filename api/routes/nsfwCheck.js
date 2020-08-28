var express = require('express');
var router = express.Router();

// get nsfwCheck
router.get('/', async function(req, res, next) {
    const result = await query(req.query.url);
    if (result.error) {
        return res.status(404).json({
            err: result.error,
            message: result.error.message,
        })
    }
    const detections = result.safeSearchAnnotation;
    // console.log('Safe search:');
    // console.log(`Adult: ${detections.adult}`);
    // console.log(`Medical: ${detections.medical}`);
    // console.log(`Spoof: ${detections.spoof}`);
    // console.log(`Violence: ${detections.violence}`);
    // console.log(`Racy: ${detections.racy}`);
    // console.log(`Overall: ${JSON.stringify(detections)}`);
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

async function query(url = 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=801') {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  // Performs label detection on the image file
  const [result] = await client.safeSearchDetection(url);
  return result;
}

function nsfwChecker(result) {
    const arr = Object.entries(result);
    return arr.filter(elem => elem[1] === "VERY_LIKELY");
}

module.exports = router;