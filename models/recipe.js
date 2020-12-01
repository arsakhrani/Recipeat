const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mealType: {
        breakfast: {
            type: Boolean,
            default: false
        },
        lunch: {
            type: Boolean,
            default: false
        },
        dinner: {
            type: Boolean,
            default: false
        }
    },
    ingredients: [{
        name: String,
        unit: String,
        amount: Number
    }],
    instructions: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;