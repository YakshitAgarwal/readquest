const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ message: "Hello" });
});

router.post("/post-blog", async (req, res) => {
  try {
    console.log(req.body);
    const newBlog = new Blog({
      author: req.body.author,
      title: req.body.title,
      body: req.body.body,
    });

    await newBlog.save();

    return res.status(200);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create blog",
      error: error.message,
    });
  }
});

module.exports = router;
