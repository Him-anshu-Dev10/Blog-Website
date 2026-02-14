import fs from "fs";
import Blog from "../models/Blog.js";
import imagekit from "../configs/imagekit.js";
import Comment from "../models/Comment.js";
import main from "../configs/Gemini.js";
export const addBlog = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    if (!req.body.blog) {
      return res.json({ success: false, message: "Blog data is required" });
    }

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    let blogData;
    try {
      blogData = JSON.parse(req.body.blog);
    } catch (parseError) {
      // console.error("JSON Parse Error:", parseError.message);
      // console.log("Received blog data:", req.body.blog);
      return res.json({
        success: false,
        message: "Invalid JSON format: " + parseError.message,
      });
    }

    const { title, subtitle, description, category, isPublished } = blogData;

    if (!title || !subtitle || !description || !category) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const image = req.file;
    //upload image to imagekit
    console.log("ImageKit instance:", typeof imagekit);
    console.log("ImageKit upload method:", typeof imagekit.upload);

    if (!imagekit.upload) {
      return res.json({
        success: false,
        message: "ImageKit upload method not available",
      });
    }

    const filebuffer = fs.readFileSync(image.path);
    const uploadResponse = await imagekit.upload({
      file: filebuffer,
      fileName: image.originalname,
      folder: "/blogs",
    });
    //optimize image
    const optimizedImage = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { width: "1280" },
        { format: "webp" },
        { quality: "80" },
      ],
    });
    const imageUrl = optimizedImage;

    //create blog
    const newBlog = new Blog({
      title,
      subtitle,
      description,
      category,
      image: imageUrl,
      ispublished: isPublished || false,
    });
    await newBlog.save();
    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ ispublished: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, blogs });
  } catch (error) {
    // console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Fetching blog with ID:", id);
    const blog = await Blog.findById(id);
    if (!blog) {
      // console.log("Blog not found for ID:", id);
      return res.json({ success: false, message: "Blog not found" });
    }
    // console.log("Blog found:", blog.title);
    res.json({ success: true, blog });
  } catch (error) {
    // console.error("Error fetching blog by ID:", error);
    res.json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(req.body);

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    blog.ispublished = !blog.ispublished;
    await blog.save();
    res.json({
      success: true,
      message: `Blog ${blog.ispublished ? "published" : "unpublished"} successfully`,
      blog,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { name, blogId, content } = req.body;
    await Comment.create({ name, blogId, content });

    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blogId, isApproved: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, comments });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
export const generateContent = async (req, res) => {
  try {
    const { title, subTitle } = req.body;

    if (!title || !subTitle) {
      return res.json({
        success: false,
        message: "Title and subtitle are required",
      });
    }

    const prompt = `You are a professional blog writer. Write a detailed, long-form blog post with the title: "${title}" and subtitle: "${subTitle}".

Requirements:
- Write at least 1500 words
- Use proper HTML formatting with <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <blockquote> tags
- Include an engaging introduction (2-3 paragraphs)
- Include 4-6 detailed sections each with their own subheading
- Each section should have 2-4 paragraphs of detailed content
- Add a compelling conclusion section
- Use examples, statistics, or practical tips where relevant
- Make the content informative, engaging, and well-structured
- Do NOT wrap the output in markdown code blocks, return raw HTML only`;

    const content = await main(prompt);

    res.json({ success: true, content });
  } catch (error) {
    console.error("AI Content Generation Error:", error);
    res.json({ success: false, message: "Failed to generate content" });
  }
};
