const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
//These lines of code are to compare the user passwords with the passwords being submitted in the input
//It uses a function called bcrypt.
function loginRedirect(req, res, next) {
    if (req.user) return res.status(401).json({ status: 'You are already logged in' });

    return next();
}
//This function redirects the page depending on the users login in status. If they are logged in
//they will be sent to an error page.
function createUser(req, res) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    //This ^ adds an extra layer of safety by encrypting the inputted password
    return models.User.create({
        username: req.body.username,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        dob: req.body.dob
    }).then(() => {
        res.redirect('/');
    });
}


//This ^  categorizes all the data recieved from the ejs form and stores them in a database

function loginRequired(req, res, next) {
    if (!req.user) return res.status(401).json({ status: 'Please log in' });

    return next();
}

module.exports = {
        comparePass,
        loginRedirect,
        loginRequired,
        createUser
    }
    //This code is the sister code to the 'loginredirect' code up there. If they are not logged in
    //and on this page they will be redirected and told to 'Please log in'
