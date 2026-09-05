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
    return res.status(404).json({
      message: "Blog not found",
    });
  }

  if (req.user.isAdmin) {
    return res.status(200).json(blog);
  }

  const hasUnlocked = req.user.unlockedBlogs.some(
    (blogId) => blogId.toString() === blog._id.toString(),
  );

  if (!hasUnlocked) {
    return res.status(403).json({
      message: "You have not unlocked this blog",
    });
  }

  return res.status(200).json(blog);
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({});
  res.status(200).json(blogs);
};

const getUnlockedBlogs = async (req, res) => {
  try {
    const unlockedBlogs = req.user.unlockedBlogs.map((blogId) =>
      blogId.toString(),
    );

    res.status(200).json(unlockedBlogs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get unlocked blogs",
      error: error.message,
    });
  }
};

module.exports = { createBlog, getAllBlogs, getBlogById, getUnlockedBlogs };
