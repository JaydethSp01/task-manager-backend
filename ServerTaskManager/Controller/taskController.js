const Task = require("../Models/Task");
const { validationResult } = require("express-validator");

const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la tarea." });
  }
};

const getTasks = async (req, res) => {
  const { completed } = req.query;

  let filter = {};

  if (completed !== undefined) {
    if (completed === "completed") {
      filter.completed = true;
    } else if (completed === "pending") {
      filter.completed = false;
    } else {
      return res.status(400).json({
        mensaje: "Valor de 'completed' no válido. Usa 'completed' o 'pending'.",
      });
    }
  }

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las tareas." });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ mensaje: "Tarea no encontrada." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la tarea." });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ mensaje: "Tarea no encontrada." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la tarea." });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ mensaje: "Tarea no encontrada." });
    }

    res.status(200).json({ mensaje: "Tarea eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la tarea." });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
