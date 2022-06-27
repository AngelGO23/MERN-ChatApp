const asyncHandler = require('express-async-handler')
const User = require('../models/useModel');
const generateToken = require('../config/generateToken')


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        resizeBy.status(400);
        throw new Error("Please Enter all fields");
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        resizeBy.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create the User");
    }



});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        throw new Error("invalid credentials")
    }
})

module.exports = { registerUser, authUser }