const imageModel = require('../models/imageModel')
const cloudinary = require('cloudinary')
const fs = require('fs')
const { createCanvas, loadImage} = require('canvas')

// Function to add watermark to image
async function addWatermark(imagePath, watermarkText) {
    try {
        const image = await loadImage(imagePath)
        const canvas = createCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0)

        // Add watermark
        const watermarkFont = '20px Arial'
        const watermarkColor = 'rgba(255, 255, 255, 0.5)'
        ctx.font = watermarkFont
        ctx.fillStyle = watermarkColor
        ctx.fillText(watermarkText, 10, canvas.height - 10)

        // Save the image with watermark
        const output = fs.createWriteStream(imagePath)
        const stream = canvas.createPNGStream({ compressionLevel: 6 })
        stream.pipe(output)
        
        // Close the stream after finishing writing
        stream.on('finish', () => {
            output.end()
        })
    } catch (error) {
        throw new Error(
            `Error adding watermark: ${error.message}`
        )
    }
}

exports.uploadAndSaveImage = async (req, res, next) => {
    const { imagePath, watermarkText } = req.body

    try {
        if (!imagePath || !watermarkText) {
            return res.status(400).json({
            success: false, 
            message: 'Image path and watermark text are required.'})
        }

        // Add watermark to the image
        await addWatermark(imagePath, watermarkText)

        // Upload image to Cloudinary
        const uploadedImage = await cloudinary.uploader.upload(imagePath)

        // Save image data to MongoDB using Mongoose
        const newImage = new imageModel({
            filename: uploadedImage.original_filename,
            originalPath: uploadedImage.url,
            watermarkText: watermarkText,
        })
        await newImage.save()

        res.status(200).json({ 
        success: true, 
        message: 'Image uploaded and saved successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
        success: false,
         message: 'Error uploading and saving image' })
    }
}
