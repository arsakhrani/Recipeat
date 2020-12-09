const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const {isLoggedIn} = require('../utils/middleware');
const nutripeats = require('../controllers/nutripeats')

router.route('/')
    .get(isLoggedIn, wrapAsync(nutripeats.index))
    .post(isLoggedIn, wrapAsync(nutripeats.addNutrition));

router.get('/new', isLoggedIn, wrapAsync(nutripeats.newForm));

router.get('/:id/edit', isLoggedIn, wrapAsync(nutripeats.editForm));

router.route('/:id')
    .put(isLoggedIn, wrapAsync(nutripeats.editNutrition))
    .delete(isLoggedIn, wrapAsync(nutripeats.deleteNutrition))
    .get(isLoggedIn, wrapAsync(nutripeats.showNutrition));

module.exports = router;