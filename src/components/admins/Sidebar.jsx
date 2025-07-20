import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <div className="flex flex-col  border-r border-gray-200 min-h-full pt-6">
      <NavLink
        end={true}
        to={"/admin"}
        className={({ isActive }) =>
          `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-100 border-r-4 border-blue-600"
          }`
        }
      >
        <img src={assets.home_icon} className="mix-w-4 w-5" alt="" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to={"/admin/AddBlogs"}
        className={({ isActive }) =>
          `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-100 border-r-4 border-blue-600"
          }`
        }
      >
        <img src={assets.add_icon} className="mix-w-4 w-5" alt="" />
        <p className="hidden md:inline-block">Add blogs</p>
      </NavLink>

      <NavLink
        to={"/admin/ListBlogs"}
        className={({ isActive }) =>
          `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-100 border-r-4 border-blue-600"
          }`
        }
      >
        <img src={assets.list_icon} className="mix-w-4 w-5" alt="" />
        <p className="hidden md:inline-block">Blogs List</p>
      </NavLink>

      <NavLink
        to={"/admin/Comments"}
        className={({ isActive }) =>
          `flex item-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-100 border-r-4 border-blue-600"
          }`
        }
      >
        <img src={assets.comment_icon} className="mix-w-4 w-5" alt="" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
