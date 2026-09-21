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
      description,
      formUrl,
      amount: amountNumber,
      unlocksAvailable,
    });

    return res.status(201).json({
      _id: task._id,
      title: task.title,
      companyName: task.companyName,
      description: task.description,
      formUrl: task.formUrl,
      amount: task.amount,
      unlocksAvailable: task.unlocksAvailable,
    });
  } catch (error) {
    console.error("CREATE TASK ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createTask };
