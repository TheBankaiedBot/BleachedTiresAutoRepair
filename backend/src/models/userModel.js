const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

// Define the User schema for MongoDB using Mongoose.
// This schema includes the fields required to create a user account.
const userSchema = new mongoose.Schema({
        // First name is required and trimmed to remove extra spaces.
        firstName: {type: String, required: true, trim: true},
        // Last name is required and also trimmed.
        lastName: {type: String, required: true, trim: true},
        // Email is required, must be unique, normalized to lowercase,
        // and validated by a regex pattern.
        email: {type: String, required: true, unique: true, lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        // Password is required, must be at least 8 characters,
        // and is hidden from query results by default.
        password: {type: String, required: true, minlength: 8, select: false},
        // Phone number is required and must match the specified format.
        phone: {type: String, 
            match: [/^\d{3}-\d{3}-\d{4}$/, 'Please fill a valid phone number (e.g. 555-555-5555)']
        },
        // Zipcode is required for customer address/region data.
        zipcode: {type: String, required: true}
},{timestamps: true});




// Before saving a user, hash the password if it was created or changed.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    // Let Mongoose handle the rejected promise — it will treat this as an error
    throw err;
  }
});

// Add a helper method to instances of User so we can compare passwords during login.
userSchema.methods.comparePassword = function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
