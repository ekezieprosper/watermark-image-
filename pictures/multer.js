const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const filefilter = (req, file, cb)=>{
    if (file.mimetype.startWith("image/")) {
        cb(null, true)
    } else {
        cb(new Error("Can only upload image"), false)
    }
}

const filesize = ({
    limits: 1024* 1024* 20
})

const upload = multer({
    storage,
    filefilter,
    limits: filesize
})

module.exports = upload