import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import Admin from "../models/Admin.js";
// Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // First try DB-based login
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return res.json({ success: true, message: "login", token });
      }
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Fallback to env-based login (backwards compatible)
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, message: "login", token });
    }

    res.json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getallComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("blogId")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const getDashboardStats = async (req, res) => {
  try {
    const recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const totalComments = await Comment.countDocuments();

    const drafts = await Blog.countDocuments({ ispublished: false });
    const dashboardStats = {
      recentBlogs,
      blogs,
      totalComments,

      drafts,
    };
    res.json({ success: true, dashboardStats });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    await Comment.deleteMany({ blogId: id });
    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const approveComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true },
    );
    if (!comment) {
      return res.json({ success: false, message: "Comment not found" });
    }
    res.json({
      success: true,
      message: "Comment approved successfully",
      comment,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
