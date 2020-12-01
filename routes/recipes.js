const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const mongoose = require('mongoose');
const {isLoggedIn} = require('../utils/middleware');

const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');

router.get('/', isLoggedIn, wrapAsync(async (req, res, next) => {
    const {mealtype} = req.query;
    if(mealtype === 'breakfast') {
        const recipes = await Recipe.find({'mealType.breakfast': true, author: req.user._id})
        res.render('recipes', {recipes, mealtype})
    } else if (mealtype === 'lunch') {
        const recipes = await Recipe.find({'mealType.lunch': true, author: req.user._id})
        res.render('recipes', {recipes, mealtype})
    } else if (mealtype === 'dinner') {
        const recipes = await Recipe.find({'mealType.dinner': true, author: req.user._id})
        res.render('recipes', {recipes, mealtype})
    } else {
        const recipes = await Recipe.find({author: req.user._id})
        res.render('recipes', {recipes, mealtype: 'All'})
    }
}));

router.get('/new', isLoggedIn, wrapAsync(async (req, res, next) => {
    const recipes = await Recipe.find({})
    res.render('addrecipe', {recipes})
}));

router.post('/', isLoggedIn, wrapAsync(async (req, res, next) => {
    const details = req.body
    const inputItem = (d) => {
        if (d.breakfast) {d.breakfast = true}
        if (d.lunch) {d.lunch = true}
        if (d.dinner) {d.dinner = true}
        ingredientArray = []
        for (let i = 0; i < d.ingredient1.length; i++) {
            let obj = {
                name: d.ingredient1[i],
                unit: d.unit1[i],
                amount: d.amount1[i]
            }
            ingredientArray.push(obj)
        }
        const newRecipe = new Recipe({
            name: d.name,
            mealType: {
                breakfast: d.breakfast,
                lunch: d.lunch,
                dinner: d.dinner
            },
            ingredients: ingredientArray,
            instructions: d.instructions,
            author: req.user._id
        })
        newRecipe.save().then(newRecipe => {
            console.log(newRecipe)
        }) 
    }
    inputItem(details);
    req.flash('success', 'Succesfully saved a new recipe!')
    res.redirect('/recipes')
}));

router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes')
    }
    const recipes = await Recipe.find({})
    res.render('editrecipe', {recipe, recipes})
}));

router.put('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const d = req.body;
    let ingredientArray = []
    if (d.breakfast) {d.breakfast = true}
    if (d.lunch) {d.lunch = true}
    if (d.dinner) {d.dinner = true}
    for (let i = 0; i < d.ingredient1.length; i++) {
        let obj = {
            name: d.ingredient1[i],
            unit: d.unit1[i],
            amount: d.amount1[i]
        }
        ingredientArray.push(obj)
    }
    const editedRecipe = {
        name: d.name,
        mealType: {
            breakfast: d.breakfast,
            lunch: d.lunch,
            dinner: d.dinner
        },
        ingredients: ingredientArray,
        instructions: d.instructions
    }
    const recipeUpdateCheck = await Recipe.findById(id);
    if (!recipeUpdateCheck.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/recipes/${id}`);
    }
    const recipeUpdate = await Recipe.findByIdAndUpdate(id, editedRecipe);
    req.flash('success', 'Succesfully edited recipe!')
    res.redirect(`/recipes/${recipeUpdate._id}`)
}));

router.delete('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const recipeDeleteCheck = await Recipe.findById(id);
    if (!recipeDeleteCheck.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/recipes/${id}`);
    }
    const recipeDelete = await Recipe.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted recipe!')
    res.redirect('/recipes')
}));

router.get('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes')
    }
    const ingredientPack = []
    for (let item of recipe.ingredients) {
        const foundIngredient = await Nutrition.findOne({ingredient: item.name})
        if (foundIngredient) { ingredientPack.push(foundIngredient) }
    }
    console.log(ingredientPack)
    res.render('recipe', {recipe, ingredientPack})
}));

module.exports = router;