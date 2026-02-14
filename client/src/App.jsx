import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Blog from "./components/pages/Blog";
import Layout from "./components/pages/admin/Layout";
import Dashboard from "./components/pages/admin/Dashboard";
import Comments from "./components/pages/admin/Comments";
import AddBlogs from "./components/pages/admin/AddBlogs";
import ListBlogs from "./components/pages/admin/ListBlogs";
import Login from "./components/admins/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/appContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAppContext();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  const { token } = useAppContext();

  return (
    <div>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/admin" replace /> : <Login />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="AddBlogs" element={<AddBlogs />} />
          <Route path="ListBlogs" element={<ListBlogs />} />
          <Route path="Comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
