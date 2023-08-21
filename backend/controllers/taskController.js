const Task = require("../models/taskModel");

// Create a Task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = await Task.create({
      title,
      user: req.user._id, // Use the authenticated user's ID
    });
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Task creation failed", error: error.message });
  }
};

// Get all Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json({ tasks });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

// Get a single Task
const getTask = async (req, res) => {
  try {
    const taskid = req.params.taskid;
    const task = await Task.findOne({ _id: taskid, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

// Delete the task associated with the logged-in user by its ID
const deleteTask = async (req, res) => {
  try {
    const taskid = req.params.taskid;
    const deletedTask = await Task.findOneAndDelete({
      _id: taskid,
      user: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Task deletion failed", error: error.message });
  }
};

// Update the task associated with the logged-in user by its ID
const updateTask = async (req, res) => {
  try {
    const taskid = req.params.taskid;
    const { title, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskid, user: req.user._id },
      { title, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Task update failed", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};
