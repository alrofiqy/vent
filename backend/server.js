const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const errorHandler = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const app = express()

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())

//routes middleware
app.use('/api/users', userRoute)

//routes
app.get('/', (req, res) => {
    res.send('Home Page')
})
//Error middleware
app.use(errorHandler)
// Connect mongodb and start server
const PORT = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

    })
    .catch((err) => console.log(err))