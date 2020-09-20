const express = require('express')
const app = express()
const port = process.env.PORT
require('./db/mongoose')
const mongodb = require('mongodb')
const User = require('./models/user.js')
const Task = require('./models/task.js')
const userRouter = require('../routers/user.js')
const taskRouter = require('../routers/task.js')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth.js')
//const Task = require('../src/models/task.js')

//app.use(auth)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port , ()=>{
    console.log("server is up on port:"+port)
});



const main = async()=>{
   }

app.post(('/upload'), (req,res)=>{
    res.send()
})

main()

