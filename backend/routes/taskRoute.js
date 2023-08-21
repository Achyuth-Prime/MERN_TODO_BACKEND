const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/verify", verifyToken, (req, res) => {
  const user = req.user;
  res.json({
    message: `Welcome, ${user.username}! This is a secure route.`,
    user,
  });
});

const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

router.use(verifyToken);

router.route("/").get(getTasks).post(createTask);
router.route("/:taskid").get(getTask).delete(deleteTask).put(updateTask);

module.exports = router;

// {
// // router.post("/", createTask);
// // router.get("/", getTasks);
// // router.get("/:id", getTask);
// // router.delete("/:id", deleteTask);
// // router.put("/:id", updateTask);
// }
