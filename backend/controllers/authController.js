let User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Controller for user registration
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    let newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate and send a JWT token
    const token = jwt.sign({ userID: newUser._id }, process.env.SECRET_KEY);

    res
      .status(201)
      .json({ message: "Registration Successful", token, username });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration Failed", error: err.message });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and send a JWT token
    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY);
    res.status(200).json({ message: "Login Successful", token, username });
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
