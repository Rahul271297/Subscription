const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        trim: true
    }
        }, { timestamps: true })

module.exports = mongoose.model('User', userSchema)