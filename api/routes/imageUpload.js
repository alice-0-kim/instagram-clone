var express = require('express');
var multer = require('multer');
var router = express.Router();
const path = require('path');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

router.post('/', upload.single('myImage'), (req, res) => {
  console.log(req.file);
  // const image = 

  // if (result.error) {
  //     return res.status(404).json({
  //         err: result.error,
  //         message: result.error.message,
  //     })
  // }
  // if (nsfwResult.length === 0) {
  //     console.log(true);
  //     return res.status(200).json({
  //         isSafe: true,
  //     });
  // } else {
  //     console.log(false);
  //     return res.status(200).json({
  //         isSafe: false,
  //         message: `${nsfwResult.map(x => x[0]).join(', ')}`
  //     })
  // }
});

module.exports = router;
