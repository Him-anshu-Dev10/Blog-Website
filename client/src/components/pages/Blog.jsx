import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import { useAppContext } from "../../context/appContext";
import { assets, blog_data, comments_data } from "../../assets/assets";
import moment from "moment";
import Footer from "../Footer"; // Correct import path
import Loader from "./Loader";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) setData(data.blog);
      else toast.error("Failed to load blog data");
    } catch (error) {
      console.error("Failed to fetch blog data");
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}/comments`);
      if (data.success) setComments(data.comments);
      else toast.error("Failed to load comments");
    } catch (error) {
      console.error("Failed to fetch comments");
    }
  };

  const addComment = async (e) => {
    e.preventDefault(); // Prevents page reload
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blogId: id,
        name: commentName.trim(),
        content: commentContent.trim(),
      });
      if (data.success) {
        toast.success("Comment added successfully");

        // Add the new comment to the local state
        const newComment = {
          name: commentName.trim(),
          content: commentContent.trim(),
          createdAt: new Date().toISOString(),
          _id: Date.now().toString(),
        };

        setComments((prevComments) => [...prevComments, newComment]);

        // Clear the form
        setCommentName("");
        setCommentContent("");
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Failed to submit comment");
      toast.error("Failed to submit comment");
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  if (!data) {
    return (
      <div>
        {/* <Navbar /> */}
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {" "}
      {/* This is your outermost div for the Blog page */}
      <Navbar /> {/* Navbar spans full width */}
      {/* Blog Title/Meta Info - often full width or with controlled max-width */}
      <div className="text-center mt-20 text-gray-600">
        Published on {moment(data.createdAt).format("MMMM Do YYYY")}
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-blue bg-blue font-medium text-primary">
          micle
        </p>
      </div>
      {/* Main Blog Content Area (image, description, comments, comment form, social icons) */}
      <div className="mx-auto max-w-5xl my-10">
        <img src={data.image} className="rounded-3xl mb-5" alt="" />
        {data.description && (
          <div
            className="rich-text max-w-3xl mb-5 mx-auto"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        )}

        {/* Comment Section (Displaying existing comments) */}
        <div className="mt-14 mb-10 max-w-xl mx-auto">
          <p className="font-semibold mb-4">Comments({comments.length}) </p>
          <div className="flex flex-col gap-4">
            {comments.map((item, index) => (
              <div
                key={index}
                className="relative bg-blue border border-primary max-w-full p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium"> {item.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8"> {item.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Box (Form for adding new comments) */}
        <div className="max-w-xl mx-auto">
          <p className="font-semibold mb-4">Add your comment</p>
          <form onSubmit={addComment} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
            />
            <textarea
              placeholder="Comment"
              className="w-full p-2 border border-gray-300 rounded outline-none h-32 resize-y"
              required
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded
                         hover:bg-blue-500
                         active:bg-blue-700
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                         transition-colors duration-200
                         self-end"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social media icons */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.googleplus_icon} alt="" />
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
};

export default Blog;
