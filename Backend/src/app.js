const express = require('express')
const authRouter = require('./routes/auth.route.js')
const cookieParser = require('cookie-parser')
const foodRouter = require('./routes/food.route.js')
const cors = require('cors')
const foodPartnerRoutes = require('./routes/food-partner.route.js')

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true 
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/food', foodRouter)
app.use('/api/food-partner', foodPartnerRoutes)

module.exports = app