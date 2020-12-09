const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');

module.exports.index = async (req, res, next) => {
    const nutritions = await Nutrition.find({})
    res.render('nutritions', {nutritions})
}

module.exports.newForm = async (req, res, next) => {
    const nutritions = await Nutrition.find({})
    const recipes = await Recipe.find({})
    res.render('addnutrition', {recipes, nutritions})
}

module.exports.addNutrition = async (req, res, next) => {
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
        newNutrition.save()
    }
    inputItem(details);
    req.flash('success', 'Succesfully saved a new ingredient!')
    res.redirect('/nutritions')
}

module.exports.editForm = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user
    const nutrition = await Nutrition.findById(id)
    if (!nutrition) {
        req.flash('error', 'Cannot find that ingredient!')
        return res.redirect('/nutritions')
    }
    res.render('editnutrition', {nutrition, user})
}

module.exports.editNutrition = async (req, res, next) => {
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
}

module.exports.deleteNutrition = async (req, res, next) => {
    const { id } = req.params;
    const nutritionDelete = await Nutrition.findByIdAndDelete(id)
    req.flash('success', 'Succesfully deleted ingredient!')
    res.redirect('/nutritions')
}

module.exports.showNutrition = async (req, res, next) => {
    const { id } = req.params;
    const nutrition = await Nutrition.findById(id)
    if (!nutrition) {
        req.flash('error', 'Cannot find that ingredient!')
        return res.redirect('/nutritions')
    }
    res.render('nutrition', {nutrition})
}