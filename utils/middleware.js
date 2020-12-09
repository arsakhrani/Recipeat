const Recipe = require('../models/recipe');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be signed in to view this page.')
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const recipeUpdateCheck = await Recipe.findById(id);
    if (!recipeUpdateCheck.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/recipes/${id}`);
    }
    next();
}