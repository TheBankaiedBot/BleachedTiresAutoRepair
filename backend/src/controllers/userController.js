const User = require('../models/userModel');

const registerUser = async (req, res) => {
        // Extract user data from request body
    const { firstName, lastName, email, password, phone, zipcode } = req.body;

    try {
        // Create a new user in the database
        const user = await User.create({ firstName, lastName, email, password, phone, zipcode });
        // Respond with the created user (excluding password)
        res.status(201).json({ 
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            zipcode: user.zipcode
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser };