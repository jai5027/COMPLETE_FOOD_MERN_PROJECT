const express = require('express')
const Middleware = require('../middleware/auth.middleware.js')
const router = express.Router()
const foodPartnerController = require('../controllers/food-partner.controller.js')

router.get('/:id', Middleware.authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router