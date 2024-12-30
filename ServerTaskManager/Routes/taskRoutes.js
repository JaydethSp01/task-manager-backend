const express = require("express");
const { check } = require("express-validator");
const authMiddleware = require("../Middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");

const router = express.Router();

router.get("/generate-token", (req, res) => {
  const payload = { userId: "admin" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

router.post(
  "/tasks",
  authMiddleware,
  [check("title", 'El campo "title" es obligatorio.').not().isEmpty()],
  createTask
);

router.get("/tasks", authMiddleware, getTasks);

router.get("/tasks/:id", authMiddleware, getTaskById);

router.put(
  "/tasks/:id",
  authMiddleware,
  [
    check("title", 'El campo "title" es obligatorio.')
      .optional()
      .not()
      .isEmpty(),
  ],
  updateTask
);

router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;
