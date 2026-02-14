import React, { useState, useEffect } from "react";
import { assets } from "../../../assets/assets";
import BlogTableItem from "../../admins/BlogTableItem";
import { useAppContext } from "../../../context/appContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios } = useAppContext();
  const [dashboard, setDashboardData] = useState({
    blogs: 0,
    totalComments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard-stats");
      if (data.success) {
        setDashboardData(data.dashboardStats);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        {" "}
        {/* Added justify-center for responsiveness */}
        {/* Card for Blogs */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_1}
            alt="Blogs Icon"
            className="w-12 h-12"
          />
          <div>
            <p className="text-2xl font-semibold">{dashboard.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>
        {/* Card for Comments */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_2}
            alt="Comments Icon"
            className="w-12 h-12"
          />
          <div>
            <p className="text-2xl font-semibold">{dashboard.totalComments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        {/* Card for Drafts */}
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img
            src={assets.dashboard_icon_3}
            alt="Drafts Icon"
            className="w-12 h-12"
          />
          <div>
            <p className="text-2xl font-semibold">{dashboard.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        {" "}
        {/* Corrected item-center to items-center */}
        <img
          src={assets.dashboard_icon_4}
          alt="Latest Blog Icon"
          className="w-6 h-6"
        />{" "}
        {/* Added alt text and size */}
        <p className="text-lg font-semibold">Latest Blog</p>
      </div>
      <div className="relative max-w-full overflow-x-auto shadow rounded-lg bg-white">
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
            {/* CORRECTED: The map function's return statement */}
            {/* Added a conditional check for dashboard.recentBlogs to prevent errors if it's not yet populated */}
            {dashboard.recentBlogs && dashboard.recentBlogs.length > 0 ? (
              dashboard.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboardData} // Pass the function down to refresh data after actions
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

export default Dashboard;
