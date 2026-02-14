import React, { useEffect, useState } from "react";
import BlogTableItem from "../../admins/BlogTableItem";
import { useAppContext } from "../../../context/appContext";
import toast from "react-hot-toast";

const ListBlogs = () => {
  const { axios } = useAppContext();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {" "}
      <h1>All Blogs</h1>
      <div className="relative  mt-4 h-4/5 max-w-full overflow-x-auto shadow rounded-lg bg-white">
        {" "}
        {/* Corrected max-w-4x1 to max-w-full */}
        <table className="w-full text-sm text-gray-500 text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {" "}
            {/* Added more common Tailwind header styling */}
            <tr>
              <th scope="col" className="px-6 py-3">
                {" "}
                {/* Adjusted padding for better visual spacing */}#
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                {" "}
                {/* Corrected 'max:sm-hidden' to 'hidden md:table-cell' for responsiveness */}
                Date
              </th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">
                {" "}
                {/* Changed 'Scope' to 'Status' for consistency with `isPublished` */}
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchBlogs} // Pass the function down to refresh data after actions
                  index={index + 1}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No recent blogs to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlogs;
