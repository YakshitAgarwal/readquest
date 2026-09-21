const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    formUrl: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    amountUsed: {
      type: Number,
      default: 0,
    },

    unlocksAvailable: {
      type: Number,
      required: true,
    },

    unlocksUsed: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
