const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
//These lines of code are to compare the user passwords with the passwords being submitted in the input
//It uses a function called bcrypt.
