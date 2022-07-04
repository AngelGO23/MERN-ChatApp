const jwt = require('jsonwebtoken');
const dotnev = require('dotenv')

dotnev.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

module.exports = generateToken