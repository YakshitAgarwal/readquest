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

const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.status(200).json(blog);
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};

module.exports = { createBlog, getAllBlogs, getBlogById };
