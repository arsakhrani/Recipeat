const mongoose = require('mongoose');

const Recipe = require('../models/recipe');

mongoose.connect('mongodb+srv://arsakhrani:BikaPeluD1y9ChyW@cluster0.naayg.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true})
    .then(() => {
        console.log('Mongoose connection open');
    })
    .catch(err => {
        console.log(err);
    })

const image = 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1000&q=80'
const imageSeed = async() => {
    const recipe = await Recipe.findById('5fc6bdaf0ed5ba0017a2cbfa')
    recipe.image = image;
    const editedRecipe = await recipe.save();
    console.log(recipe);
}

imageSeed();