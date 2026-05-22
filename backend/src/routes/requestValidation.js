const {body, validationResult} = require('express-validator');


const registerValidation = [
    body('firstName').trim().notEmpty().withMessage('First Name is Required'),
    body('lastName').trim().notEmpty().withMessage('Last Name is Required'),
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    body('phone').matches(/^\d{3}-\d{3}-\d{4}$/).withMessage('Phone number must be in the format 555-555-5555'),
    body('zipcode').notEmpty().withMessage('Zipcode is Required')
];

const registerHandler = async (req,res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()});
    next();
};

module.exports = {registerValidation, registerHandler};