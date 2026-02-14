import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) setBlogs(data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = "/";
  };

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
