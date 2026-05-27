const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, zipcode } = req.body;

  try {
    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      zipcode
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return SAME SHAPE as login controller
    return res.status(201).json({
      success: true,
      data: { token }
    });

  } catch (error) {
    // Duplicate email
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = { registerUser };
