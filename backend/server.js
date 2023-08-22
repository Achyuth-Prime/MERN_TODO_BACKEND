const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/taskRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-task-app.onrender.com",
      "http://mern-task-app.onrender.com",
      "http://mern-task-app-9wxc.onrender.com",
      "https://mern-task-app-9wxc.onrender.com",
      "http://mern-task-app-five.vercel.app",
      "https://mern-task-app-five.vercel.app",
    ],
    credentials: true,
  })
);

app.get("/hello", (req, res) => {
  res.json("hey");
});

app.use("/api/users", authRoutes);
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
