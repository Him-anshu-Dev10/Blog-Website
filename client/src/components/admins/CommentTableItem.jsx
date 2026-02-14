import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { axios } = useAppContext();
  const { blogId, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const approveComment = async () => {
    try {
      const { data } = await axios.post(`/api/admin/approve-comment/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to approve comment");
    }
  };

  const deleteComment = async () => {
    try {
      const { data } = await axios.delete(`/api/admin/comments/${_id}`);
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <tr className="border-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b>:{" "}
        {blogId?.title || "Unknown"}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b>: {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b>: {comment.content}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-5">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
              alt="Approve"
            />
          ) : (
            <p className="text-xs border border-green-600 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}
          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            alt="Delete"
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
