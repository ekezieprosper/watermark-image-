const express = require("express")
const mongoose = require("mongoose")
const imageRouter = require("./routers/imageRouter")
const app = express()
app.use(express.json())
app.use(imageRouter)



require("dotenv").config()

const port = process.env.port
const dblink =process.env.dblink

mongoose.connect(dblink).then(()=>{
    console.log("Database is connected successfully");
    app.listen(port, ()=>{
        console.log(`server is active on port ${port}`);

    })
}).catch((error)=>{
    console.log(error.message);
})