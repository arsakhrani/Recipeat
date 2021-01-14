const mongoose = require('mongoose');

const Recipe = require('../models/recipe');

mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true})
    .then(() => {
        console.log('Mongoose connection open');
    })
    .catch(err => {
        console.log(err);
    })


const vegSeed = async() => {
    const recipe = await Recipe.findById('5fccb4a7ede9c3001760f922')
    recipe.isVegetarian = true;
    recipe.isVegan = true;
    const editedRecipe = await recipe.save();
    console.log(recipe);
    
}

vegSeed();