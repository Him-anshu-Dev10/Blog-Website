import express from "express";
import {
  addBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  togglePublish,
  addComment,
  getCommentsByBlogId,
  generateContent,
} from "../controller/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

// CREATE BLOG
blogRouter.post("/add", auth, upload.single("image"), addBlog);

// GET ALL BLOGS
blogRouter.get("/all", getAllBlogs);

// TOGGLE PUBLISH ✅ (POST — ABOVE dynamic)
blogRouter.post("/togglePublish", auth, togglePublish);

// ADD COMMENT
blogRouter.post("/add-comment", addComment);

// GET BLOG BY ID ❌ (ALWAYS LAST)
blogRouter.get("/:id", getBlogById);

// DELETE BLOG
blogRouter.delete("/:id", auth, deleteBlog);

blogRouter.post("/add-comment", addComment);

blogRouter.post("/comment", getCommentsByBlogId);

blogRouter.post("/generate-content", auth, generateContent);
export default blogRouter;
