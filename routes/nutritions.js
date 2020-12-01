const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const mongoose = require('mongoose');
const {isLoggedIn} = require('../utils/middleware');

const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');
const User = require('../models/user');

router.get('/', isLoggedIn, wrapAsync(async (req, res, next) => {
    const nutritions = await Nutrition.find({})
    res.render('nutritions', {nutritions})
}));

router.get('/new', isLoggedIn, wrapAsync(async (req, res, next) => {
    const nutritions = await Nutrition.find({})
    const recipes = await Recipe.find({})
    res.render('addnutrition', {recipes, nutritions})
}));

router.post('/', isLoggedIn, wrapAsync(async (req, res, next) => {
    const details = req.body
    const inputItem = (d) => {
        const newNutrition = new Nutrition({
            ingredient: d.ingredient,
            calories: {
                value: d.calorievalue,
                per: d.calorieper
            },
            protein: d.protein,
            carb: d.carb,
            fat: d.fat
        })
        newNutrition.save().then(newNutrition => {
            console.log(newNutrition)
        })
    }
    inputItem(details);
    req.flash('success', 'Succesfully saved a new ingredient!')
    res.redirect('/nutritions')
}));

router.get('/:id/edit', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user
    const nutrition = await Nutrition.findById(id)
    if (!nutrition) {
        req.flash('error', 'Cannot find that ingredient!')
        return res.redirect('/nutritions')
    }
    console.log(user)
    res.render('editnutrition', {nutrition, user})
}));

router.put('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const d = req.body;
    const editedNutrition = {
        ingredient: d.ingredient,
        calories: {
            value: d.calorievalue,
            per: d.calorieper
        },
        protein: d.protein,
        carb: d.carb,
        fat: d.fat
    }
    const nutritionUpdate = await Nutrition.findByIdAndUpdate(id, editedNutrition);
    req.flash('success', 'Succesfully edited ingredient!')
    res.redirect(`/nutritions/${nutritionUpdate._id}`)
}));

router.delete('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const nutritionDelete = await Nutrition.findByIdAndDelete(id)
    req.flash('success', 'Succesfully deleted ingredient!')
    res.redirect('/nutritions')
}));

router.get('/:id', isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const nutrition = await Nutrition.findById(id)
    if (!nutrition) {
        req.flash('error', 'Cannot find that ingredient!')
        return res.redirect('/nutritions')
    }
    res.render('nutrition', {nutrition})
}));

module.exports = router;