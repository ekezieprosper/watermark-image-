const cloudinary = require("cloudinary").v2
const dotenv = require("dotenv")
dotenv.config()         

cloudinary.config({ 
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_Key,
  api_secret:  process.env.api_secret,
});


module.exports = cloudinary