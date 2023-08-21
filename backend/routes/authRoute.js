const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json("hey");
});

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

module.exports = router;
