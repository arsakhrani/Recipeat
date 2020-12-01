const mongoose = require('mongoose');

const Nutrition = require('../models/nutrition');

mongoose.connect('mongodb://localhost:27017/recipeApp', {useNewUrlParser: true})
    .then(() => {
        console.log('Mongoose connection open');
    })
    .catch(err => {
        console.log(err);
    })

const potato = new Nutrition({
    ingredient: 'Potato',
    calories: {
        value: 77,
        per: '100gram'
    },
    protein: 2,
    carb: 17,
    fat: 0
})

potato.save().then(potato => {
    console.log(potato)
})
.catch(e => {
    console.log(e)
}) 