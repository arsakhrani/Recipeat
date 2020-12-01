const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync')

router.get('/register', (req, res) => {
    res.render('users/register')
})

router.post('/register', wrapAsync(async(req, res, next) => {
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
}))

router.get('/login', (req, res) => {
    res.render('users/login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!')
    res.redirect('/recipes')
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'See you soon!');
    res.redirect('/login');
})

module.exports = router;