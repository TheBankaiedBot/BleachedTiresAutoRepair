const User = require("../models/userModel");

const valid = await User.comparePassword(password);

if(!valid) return res,status(401).json({message: 'Invalid credentials'});

try {
    const user = await User.create(requestAnimationFrame.body);
    res.status(201).json(user);
} catch (err) {
    if (err.code ===11000 && err.keyPattern?.email){
        return res.status(409).json({message: 'Email already taken'});
    }
    res.status(500).json({message: "Server error"});
}