const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  body: {
    type: String,
    required: true,
    unique: true,
  },
  publishDate: {
    type: Date,
    default: Date.Now(),
  },
});

module.exports = mongoose.model("Blog", blogSchema);
