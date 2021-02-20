const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();

// import routes
const authRoutes = require('./routes/auth')

//app middlewares
app.use(morgan('dev'))
app.use(bodyParser.json());
// app.use(cors()) // allows all origins
if((process.env.NODE_ENV) == 'development') {
    app.use(cors({origin: `http://localhost:3000`}));
}

//middleware
app.use('/api',authRoutes)
const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log(`Your app is running at ${port}`)
})