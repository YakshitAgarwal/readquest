const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUnlockedBlogs,
  unlockBlog,
} = require("../controllers/blogController");
const { protect, admin } = require("../middlewares/authorization");

router.get("/health", (req, res) => {
  return res.json({ message: "All well" });
});

router.route("/users/signup").post(registerUser);
router.route("/users/login").post(authUser);

router.route("/blogs").get(getAllBlogs);
router.route("/blogs/unlocked").get(protect, getUnlockedBlogs);
router.route("/blogs/create").post(protect, admin, createBlog);
router.route("/blogs/:id").get(protect, getBlogById);
router.route("/blogs/:id/unlock").post(protect, unlockBlog);

module.exports = router;
