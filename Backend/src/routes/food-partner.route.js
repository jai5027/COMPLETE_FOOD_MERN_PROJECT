const express = require('express')
const Middleware = require('../middleware/auth.middleware.js')
const router = require.Router()

router.get('/:id', Middleware.authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router