const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true
    },
    calories: {
        value: Number,
        per: String
    },
    protein: {
        type: Number
    },
    carb: {
        type: Number
    },
    fat: {
        type: Number
    }
})

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;