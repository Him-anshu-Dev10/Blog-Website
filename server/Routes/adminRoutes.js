import express from "express";
import { adminLogin } from "../controller/AdminController.js";
import {
  getAllBlogs,
  getallComments,
  getDashboardStats,
  deleteCommentById,
  approveComment,
} from "../controller/AdminController.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/login", adminLogin);
router.get("/comments", auth, getallComments);
router.get("/blogs", auth, getAllBlogs);
router.get("/dashboard-stats", auth, getDashboardStats);
router.delete("/comments/:id", auth, deleteCommentById);
router.post("/approve-comment/:id", auth, approveComment);
export default router;
