const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogController");
const { protect, admin } = require("../middlewares/authorization");

router.get("/health", (req, res) => {
  return res.json({ message: "All well" });
});

router.route("/users/signup").post(registerUser);
router.route("/users/login").post(authUser);

router.route("/blogs/create").post(protect, admin, createBlog);
router.route("/blogs").get(getAllBlogs);
router.route("/blogs/:id").get(getBlogById);

module.exports = router;
