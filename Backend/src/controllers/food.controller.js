const foodModel = require('../models/food.model.js')
const storageService = require('../services/storage.service.js')
const { v4: uuid } = require('uuid')
const likeModel = require('../models/like.model.js')
const saveModel = require('../models/save.model.js')

async function createFood(req, res){

const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPatner: req.foodPartner._id
})
      res.status(201).json({
        message: "food created successfully",
        food: foodItem
      })
}

async function getFoodItems(req, res){
      const foodItems = await foodModel.find({})
      res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
      })
}

async function likeFood(req, res){
  try {
    const { foodId } = req.body
    const userId = req.user._id   

    const isAlreadyLiked = await likeModel.findOne({
      user: userId,
      food: foodId
    })

    // ❌ UNLIKE
    if(isAlreadyLiked){
      await likeModel.deleteOne({
        user: userId,
        food: foodId
      })

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        { $inc: { likeCount: -1 } },
        { new: true }
      )

      return res.json({
        like: false,
        likeCount: updatedFood.likeCount
      })
    }

    // ✅ LIKE
    await likeModel.create({
      user: userId,
      food: foodId
    })

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      { $inc: { likeCount: 1 } },
      { new: true }
    )

    return res.json({
      like: true,
      likeCount: updatedFood.likeCount
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

async function saveFood(req, res){
      const { foodId } = req.body
      const user = req.body

      const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
      })
      
      if(isAlreadySaved){
      await saveModel.deleteOne({
            user: user._id,
            food: foodId
      })
      }

      res.status(200).json({
            message: "Food unsaved successfully"
      })

      const save = await saveModel.findOne({
            user: user._id,
            food: foodId
      })

      res.status(200).json({
            message: "Food saved successfully",
            save
      })
}

module.exports = { createFood, getFoodItems, likeFood, saveFood }