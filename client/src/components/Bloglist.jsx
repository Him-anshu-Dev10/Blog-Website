import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion";
import Blogcard from "./Blogcard";
import { useAppContext } from "../context/appContext";
const Bloglist = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();
  const filteredBlogs = () => {
    if (input.trim() === "") return blogs;
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase()),
    );
  };
  return (
    <div>
      {/* Category Filter */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10">
        {blogCategories.map((item) => (
          <button
            key={item}
            onClick={() => setMenu(item)}
            className={`cursor-pointer px-5 py-2 border border-gray-300 rounded-full text-sm transition-all duration-300 relative ${
              menu === item
                ? "bg-blue-500 text-white shadow-lg scale-105"
                : "text-gray-500 bg-white hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs()
          .filter((blog) => menu === "All" || blog.category === menu)
          .map((blog) => (
            <Blogcard key={blog.id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default Bloglist;
