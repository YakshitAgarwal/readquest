const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const blog = await Blog.create({
    author: req.user.name,
    title,
    body,
  });

  res.status(201).json(blog);
};

module.exports = { createBlog };
