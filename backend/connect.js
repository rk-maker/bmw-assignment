const express  =require('express')  
const mongoose =require('mongoose')
const routes =require('./Routes/routes')
const constants = require('./constants')
const app =express()
require('dotenv').config();

console.log(`/${constants.method}/${constants.version}/${constants.bmw}`,routes)
app.use(express.json())
app.use(`/${constants.method}/${constants.version}/${constants.bmw}`,routes)
mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server connection runnign smoothly")
    })
}).catch((err)=>{
    console.log(err,constants)

})