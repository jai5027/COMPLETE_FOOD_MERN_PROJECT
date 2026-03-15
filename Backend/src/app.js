const express = require('express')
const authRouter = require('./routes/auth.route.js')
const cookieParser = require('cookie-parser')
const foodRouter = require('./routes/food.route.js')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/food', foodRouter)

module.exports = app