const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
      fullname: {
        type: String,
        required: [true, "fullname is required"],
        minlength: 3,
        maxlength: 20
      },

      email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "required for email"]
      },

      password: {
        type: String,
      }
}, {
    timestamps: true
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel