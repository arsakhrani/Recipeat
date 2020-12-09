const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn, isAuthor} = require('../utils/middleware');
const recipeats = require('../controllers/recipeats');
const { storage } = require('../cloudinary')
const multer = require('multer');
const upload = multer({ storage });

router.route('/')
    .get(isLoggedIn, wrapAsync(recipeats.index))
    .post(isLoggedIn, upload.single('image'), wrapAsync(recipeats.addRecipe));

router.get('/new', isLoggedIn, wrapAsync(recipeats.newForm));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(recipeats.editForm));

router.route('/:id')
    .put(isLoggedIn, isAuthor, upload.single('image'), wrapAsync(recipeats.editRecipe))
    .delete(isLoggedIn, isAuthor, wrapAsync(recipeats.deleteRecipe))
    .get(isLoggedIn, wrapAsync(recipeats.showRecipe));

module.exports = router;