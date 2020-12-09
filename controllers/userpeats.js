const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('users/register')
}

module.exports.newUser = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to Recipeat, ${username}`)
            res.redirect('/recipes')
        })
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login')
}

module.exports.logUser = (req, res) => {
    req.flash('success', 'Welcome back!')
    res.redirect('/recipes')
}

module.exports.logoutUser = (req, res) => {
    req.logout();
    req.flash('success', 'See you soon!');
    res.redirect('/login');
}