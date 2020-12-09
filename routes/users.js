const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const userpeats = require('../controllers/userpeats');

router.route('/register')
    .get(userpeats.registerForm)
    .post(wrapAsync(userpeats.newUser));

router.route('/login')
    .get(userpeats.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userpeats.logUser);

router.get('/logout', userpeats.logoutUser)

module.exports = router;