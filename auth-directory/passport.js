const passport = require('passport');
const models = require('../db/models/index');
//It uses a middleware called passport to serialize and deserialize data

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        models.User.findById(id)
            .then((user) => { done(null, user); })
            .catch((err) => { done(err, null); });
    });
};

//These lines of coders are about serialization. This means taking submitted data and converting it
//into code that the computer can read.
