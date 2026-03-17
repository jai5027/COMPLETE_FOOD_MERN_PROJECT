const foodPartnerModel = require('../models/foodpartner.model.js')
const foodModel = require('../models/food.model.js')

async function getFoodPartnerById(req, res){

    const foodParterId = req.params.id

    const foodPartner = await foodPartnerModel.findById(foodParterId).select("-password")
    const foodItemByFoodPartner = await foodModel.find({ foodPatner: foodParterId })

    if(!foodPartner){
        return res.status(404).json({
            message: "FoodPartner not found"
        })
    }

    res.status(200).json({
        message: "FoodPartner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),     
            foodItems: foodItemByFoodPartner
        }
    })
}

module.exports = { getFoodPartnerById }