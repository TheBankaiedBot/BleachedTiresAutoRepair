const express = require('express');
const router = express.Router();
const {registerValidation, registerHandler} = require('./requestValidation');
const {registerUser} = require('../controllers/userController');

router.post('/register', (req, res, next) => {
  console.log("Body Recieved:", req.body);
  next();
}, registerValidation, registerHandler, registerUser);
const User = require('../models/userModel');

//copilot generated code for testing user registration route
router.post('/', async (req, res) => {
    console.log("HIT / (CRUD create user)");
  try {
    const { firstName, lastName, email, password, phone, zipcode } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      zipcode
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;