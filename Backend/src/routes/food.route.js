const express = require('express')
const router = express.Router()
const Middelware = require('../middleware/auth.middleware.js')
const foodController = require('../controllers/food.controller.js')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/', Middelware.authFoodPartnerMiddelware, upload.single('video'), foodController.createFood)

router.get('/', Middelware.authUserMiddleware, foodController.getFoodItems)

router.post('/like', Middelware.authUserMiddleware, foodController.likeFood)

router.post('/save', Middelware.authUserMiddleware, foodController.saveFood)

router.get('/saved', Middelware.authUserMiddleware, foodController.getSavedFoodItems)

module.exports = router