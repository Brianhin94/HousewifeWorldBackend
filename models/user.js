const mongoose = require('mongoose');

const options = {
    timestamps: true,
    id: false,
    toJSON: {
        virtuals: true,
        transform: (_doc, userDocToReturn) => {
            delete userDocToReturn.password
            return userDocToReturn;
        }
    }
}

const favoriteSchema = new mongoose.Schema({
    name: String
})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: [favoriteSchema]
}, options)

module.exports = mongoose.model('User', userSchema);