const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');
//Passport is a middleware that streamlines authentication and keeps it all clean and encapsulated
const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
    // check to see if the username exists
    models.User.findAll({
            where: {
                username
            }
        })
        .then((user) => {
            if (user[0] === undefined) {
                return done(null, false);
            }
            //This code compares the right password with the input and says if it doesn't match return false,
            //and if it does go to that users data.
            if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
                return done(null, false);
            } else {
                return done(null, user[0].dataValues);
            }
        })
        .catch((err) => {
            return done(err);
        });
}));

module.exports = passport;
//This function is to allow users to specifically log in with a fazbook specific  username and password
//instead of oauth which is allows users to login  with outside accounts like twitter or git.
