const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, phone, zipcode } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      zipcode
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        zipcode: user.zipcode
      }
    });

  } catch (error) {
    //  Duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser };