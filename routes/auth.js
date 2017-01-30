const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

router.get('/register', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/register');
});
//This code ^ allows users to register their own accounts
router.post('/register', (req, res, next) => {
    return authHelpers.createUser(req, res)
        .then((response) => {
            console.log('registration successful');
        })
        .catch((err) => { res.status(500).json({ status: 'error' }); });
});
//This code ^  will send all the information from the createuser files to the database
//created with sequelize
router.get('/login', authHelpers.loginRedirect, (req, res) => {
    res.render('auth/login');
});
//This adds a login route
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
}));
//This checks to see if the user already has an account and if they are logged in
//So that they won't be led to a 'registration' page
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
//This line of code ^ is meant for logging out the user and killing the session
