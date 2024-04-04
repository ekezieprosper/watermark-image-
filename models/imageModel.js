const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalPath: {
        type: String,
        required: true
    },
    watermarkText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const imageModel = mongoose.model('image', imageSchema)

module.exports = imageModel
