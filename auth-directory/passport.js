const passport = require('passport');
const models = require('../db/models/index');
//Passport is a middleware that streamlines authentication and keeps it all clean and encapsulated



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
