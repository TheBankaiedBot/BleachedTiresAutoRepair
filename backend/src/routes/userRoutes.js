const express = require('express');
const router = express.Router();

const { registerValidation, registerHandler } = require('./requestValidation');
const { registerUser } = require('../controllers/userController');

// Clean, safe, correct signup route
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

module.exports = router;
