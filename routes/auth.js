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
