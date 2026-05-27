const express = require('express');
const router = express.Router();

const loginUser = require('../controllers/loginController');   
const { registerValidation, registerHandler } = require('./requestValidation');
const { registerUser } = require('../controllers/userController');

// REGISTER
router.post(
  '/register',
  (req, res, next) => {
    console.log("Body Received:", req.body);
    next();
  },
  registerValidation,
  registerHandler,
  registerUser
);

// LOGIN
router.post('/login', loginUser);   

module.exports = router;
