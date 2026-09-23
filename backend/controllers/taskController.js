const Task = require("../models/Task");

const UNLOCK_PRICE = 0.005;

const createTask = async (req, res) => {
  try {
    const { title, companyName, description, formUrl, amount } = req.body;

    if (!title || !companyName || !description || !formUrl || !amount) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const amountNumber = Number(amount);

    if (amountNumber <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    const unlocksAvailable = Math.floor(amountNumber / UNLOCK_PRICE);

    const task = await Task.create({
      title,
      companyName,
      company: req.user._id,
      description,
      formUrl,
      amount: amountNumber,
      unlocksAvailable,
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      company: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("GET TASKS ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (req.user.isCompany) {
      if (task.company.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "Not authorized to view this task",
        });
      }
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("GET TASK ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createTask, getTasks, getTaskById };
