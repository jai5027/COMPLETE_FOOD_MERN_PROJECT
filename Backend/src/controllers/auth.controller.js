const userModel = require('../models/user.model.js')
const foodPartnerModel = require('../models/foodpartner.model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req, res){

    const { fullname, email, password } = req.body

    if(!fullname || !email || !password){
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({ fullname, email, password: hash })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET)

    res.cookie("token", token)    

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    })
}

async function loginUser(req, res){

    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    const user = await userModel.findOne({ email })

    if(!user){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword){
        return res.status(400).json({
            message: "Invalid Email or password"
        })
    }

    const token = jwt.sign({
          id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User loggedIn successfully",
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    })
}

async function logoutUser(req, res){
    res.clearCookie("token")
    res.status(200).json({
        message: "User logged out successfully"
    })
}

async function registerFoodPartner(req, res){

    const { name, email, password } = req.body
    
    if(!name || !email || !password){
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    const isFoodPartnerAlreadyExists = await foodPartnerModel.findOne({ email })

    if(isFoodPartnerAlreadyExists){
        return res.status(400).json({
            message: "Food Partner Already Exists"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const foodPartner = await foodPartnerModel.create({ name, email, password: hash })

    const token = jwt.sign(
        { id: foodPartner._id },
        process.env.JWT_SECRET)

    res.cookie("token", token)    

    res.status(201).json({
        message: "Food Partner created successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    })
}

async function loginFoodPartner(req, res){

    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json({
            message: "All Fields are required"
        })
    }

    const foodPartner = await foodPartnerModel.findOne({ email })

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPassword = await bcrypt.compare(password, foodPartner.password)

    if(!isPassword){
        return res.status(400).json({
            message: "Invalid Email or password"
        })
    }

    const token = jwt.sign({
          id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food Partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            name: foodPartner.name,
            email: foodPartner.email
        }
    })
}

async function logoutFoodPartner(req, res){
    res.clearCookie("token")
    res.status(200).json({
        message: "Food Partner logged out successfully"
    })
}

module.exports = { registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner }