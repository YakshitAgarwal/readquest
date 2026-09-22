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

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    creationDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
