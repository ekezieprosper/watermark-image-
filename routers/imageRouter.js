const router = require("express").Router()

const { uploadAndSaveImage } = require("../controllers/imageController");
const upload = require("../pictures/multer");

router.post('/upload-image', upload.array('images'), uploadAndSaveImage);

module.exports = router