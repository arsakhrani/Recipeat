const Recipe = require('../models/recipe');
const Nutrition = require('../models/nutrition');
const { cloudinary } = require('../cloudinary/index')

module.exports.index = async (req, res, next) => {
    const {mealtype} = req.query;
    if(mealtype === 'breakfast') {
        const recipes = await Recipe.find({'mealType.breakfast': true})
        res.render('recipes', {recipes, mealtype})
    } else if (mealtype === 'lunch') {
        const recipes = await Recipe.find({'mealType.lunch': true})
        res.render('recipes', {recipes, mealtype})
    } else if (mealtype === 'dinner') {
        const recipes = await Recipe.find({'mealType.dinner': true})
        res.render('recipes', {recipes, mealtype})
    } else if (mealtype === 'your') {
        const recipes = await Recipe.find({'author': req.user._id})
        res.render('recipes', {recipes, mealtype})
    } else {
        const recipes = await Recipe.find({})
        res.render('recipes', {recipes, mealtype:'available'})
    }
}

module.exports.newForm = async (req, res, next) => {
    const recipes = await Recipe.find({})
    res.render('addrecipe', {recipes})
}

module.exports.addRecipe = async (req, res, next) => {
    console.log(req.file)
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
            author: req.user._id,
        })
        if (req.file) {
            newRecipe.image = req.file.path
            newRecipe.imageDelete = req.file.filename
        }
        newRecipe.save()
    }
    inputItem(details);
    req.flash('success', 'Succesfully saved a new recipe!')
    res.redirect('/recipes')
}

module.exports.editForm = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id)
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes')
    }
    const recipes = await Recipe.find({})
    res.render('editrecipe', {recipe, recipes})
}

module.exports.editRecipe = async (req, res, next) => {
    const { id } = req.params;
    const recipeImageCheck = await Recipe.findById(id);
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
    if (req.file) {
        if (recipeImageCheck.imageDelete) {
            const imageDeletion = await cloudinary.uploader.destroy(recipeImageCheck.imageDelete)
        }
        editedRecipe.image = req.file.path
        editedRecipe.imageDelete = req.file.filename
    }
    const recipeUpdate = await Recipe.findByIdAndUpdate(id, editedRecipe);
    req.flash('success', 'Succesfully edited recipe!')
    res.redirect(`/recipes/${recipeUpdate._id}`)
}

module.exports.deleteRecipe = async (req, res, next) => {
    const { id } = req.params;
    const recipeImageCheck = await Recipe.findById(id);
    if (recipeImageCheck.imageDelete) {
        const imageDeletion = await cloudinary.uploader.destroy(recipeImageCheck.imageDelete)
    }
    const recipeDelete = await Recipe.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted recipe!')
    res.redirect('/recipes')
}

module.exports.showRecipe = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate('author')
    if (!recipe) {
        req.flash('error', 'Cannot find that recipe!')
        return res.redirect('/recipes')
    }
    const ingredientPack = []
    for (let item of recipe.ingredients) {
        const foundIngredient = await Nutrition.findOne({ingredient: item.name})
        if (foundIngredient) { ingredientPack.push(foundIngredient) }
    }
    res.render('recipe', {recipe, ingredientPack})
}