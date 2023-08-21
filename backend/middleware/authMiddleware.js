const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware function to verify JWT tokens
const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    // console.log("Received token:", token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Fetch the user from the database using the userID in the token
    const fetchedUser = await User.findById(decoded.userID);

    if (!fetchedUser) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach the user object to the request for further use in the route handlers
    req.user = fetchedUser;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = verifyToken;
