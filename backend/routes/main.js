const express = require("express");
const router = express.Router();
const {
  registerUser,
  authUser,
  getCompanyNames,
} = require("../controllers/userController");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getUnlockedBlogs,
  unlockBlog,
} = require("../controllers/blogController");
const { protect, admin, company } = require("../middlewares/authorization");
const {
  createTask,
  getTasks,
  getTaskById,
  getRandomTask,
} = require("../controllers/taskController");

router.get("/health", (req, res) => {
  return res.json({ message: "All well" });
});

router.route("/users/signup").post(registerUser);
router.route("/users/login").post(authUser);
router.route("/companies/names").get(getCompanyNames);

router.route("/blogs").get(getAllBlogs);
router.route("/blogs/unlocked").get(protect, getUnlockedBlogs);
router.route("/blogs/create").post(protect, admin, createBlog);
router.route("/blogs/:id").get(protect, getBlogById);
router.route("/blogs/:id/unlock").post(protect, unlockBlog);

router.route("/tasks/create").post(protect, company, createTask);
router.route("/tasks").get(protect, company, getTasks);
router.route("/tasks/random").get(protect, getRandomTask);
router.route("/tasks/:id").get(protect, company, getTaskById);

module.exports = router;
