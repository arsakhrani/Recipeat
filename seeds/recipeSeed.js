const mongoose = require('mongoose');

const Recipe = require('../models/recipe');

mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true})
    .then(() => {
        console.log('Mongoose connection open');
    })
    .catch(err => {
        console.log(err);
    })

const author = '5fc55c96980409c2cc35a620'
const authorSeed = async() => {
    const recipes = await Recipe.find({})
    for (let recipe of recipes) {
        recipe.author = author;
        const editedRecipe = await recipe.save();
        console.log(recipe);
    }
}

authorSeed();