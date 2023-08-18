const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app=express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.use(
    cors({
      origin: ["http://localhost:3000", "https://mern-task-app.onrender.com","http://mern-task-app.onrender.com"],
      credentials: true
    })
  );
app.use("/api/tasks",taskRoutes); 

const PORT=process.env.PORT || 5000

const startServer=async()=>{
    try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`Server on ${PORT}`)
        })
    }
    catch(error){
        console.log(error);
    }
};

startServer();