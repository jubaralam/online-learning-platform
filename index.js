const express = require("express")
const server = express()
server.use(express.json())

const dotenv = require("dotenv").config()
const PORT = process.env.PORT

// import connection from db.js in config file
const connection = require("./Config/db")


// user router
const userRouter = require("./Routes/user")
server.use("/api/user", userRouter)


//course routes 
const courseRouter = require("./Routes/course")
server.use("/api/course", courseRouter)


//course module routes
const courseModuleRouter = require("./Routes/courseModule")
server.use("/api/course-module",courseModuleRouter)


server.listen(PORT, async()=>{
    try {
        await connection
        console.log(`server is running on PORT: ${PORT} and db has been connected`)
        
    } catch (error) {
        console.log(error.message)
    }
})