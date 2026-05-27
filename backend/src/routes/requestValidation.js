const {body, validationResult} = require('express-validator');

console.log("LOADED requestValidation.js");
const registerValidation = [
    body('firstName').trim().notEmpty().withMessage('First Name is Required'),
    body('lastName').trim().notEmpty().withMessage('Last Name is Required'),
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
    body('phone')
        .optional()
        .isString()
        .matches(/^\d{3}-\d{3}-\d{4}$/)
        .withMessage('Phone number must be in the format 555-555-5555')
        .custom((value) => {
            console.log("PHONE VALUE:", value);
            return true;
        }),
    body('zipcode').notEmpty().withMessage('Zipcode is Required')
];

const registerHandler = (req, res, next) => {
  console.log("VALIDATING /register request");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({
  success: false,
  errors: errors.array()
});
}
  next();
};


module.exports = {registerValidation, registerHandler};