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
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80'
    },
    imageDelete: String
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;