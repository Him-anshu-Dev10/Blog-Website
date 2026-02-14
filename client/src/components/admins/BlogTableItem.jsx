import React from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { axios } = useAppContext();
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const deleteBlog = async () => {
    try {
      const { data } = await axios.delete(`/api/blog/${blog._id}`);
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/togglePublish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to toggle publish");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 hidden md:table-cell">
        {BlogDate.toDateString()}
      </td>
      <td className="px-2 py-4 hidden md:table-cell">
        <p
          className={`${
            blog.ispublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.ispublished ? "Published" : "Draft"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.ispublished ? "Unpublish" : "Publish"}
        </button>
        <button
          onClick={deleteBlog}
          className="text-red-500 border border-red-500 px-2 py-0.5 mt-1 rounded cursor-pointer hover:bg-red-50"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
