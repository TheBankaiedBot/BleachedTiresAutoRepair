const express = require('express');
const router = express.Router();
const {registerValidation, registerHandler} = require('./requestValidation');
const registerUser = require('../controllers/userController');

router.post('/register', registerValidation, registerHandler, registerUser);

module.exports = router;