import React, { useEffect, useState, useRef } from "react";
import { assets, blogCategories } from "../../../assets/assets";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useAppContext } from "../../../context/appContext";
import toast from "react-hot-toast";
import { parse } from "marked";
const AddBlogs = () => {
  const { axios } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const generateContent = async () => {
    if (!title.trim() || !subTitle.trim())
      return toast.error("Please enter title and subtitle to generate content");
    try {
      setLoading(true);
      const { data } = await axios.post("/api/blog/generate-content", {
        title: title.trim(),
        subTitle: subTitle.trim(),
      });
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);

        toast.success("Content generated successfully");
      } else toast.error(data.message || "Failed to generate content");
    } catch (error) {
      console.error("Content Generation Error:", error);
      toast.error("Something went wrong while generating content");
    } finally {
      setLoading(false);
    }
  };
  // ✅ submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      const description = quillRef.current.root.innerHTML;

      const formData = new FormData();
      formData.append(
        "blog",
        JSON.stringify({
          title,
          subtitle: subTitle,
          description,
          category,
          isPublished,
        }),
      );
      if (image) formData.append("image", image);

      const res = await axios.post("/api/blog/add", formData, {
        headers: {
          Accept: "application/json",
        },
      });
      if (res.data.success) {
        toast.success("Blog added successfully");
        setImage(null);
        setTitle("");
        setSubTitle("");
        setCategory("Startup");
        setIsPublished(false);
        quillRef.current.root.innerHTML = "";
      }
      console.log("Response:", res.data);
      alert(res.data.message || "Blog added successfully ✅");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Something went wrong ❌");
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll p-6"
    >
      {/* Upload Thumbnail */}
      <p className="text-xl mb-2">Upload thumbnail</p>
      <label htmlFor="image">
        <img
          src={!image ? assets.upload_area : URL.createObjectURL(image)}
          alt="upload area"
          className="w-32 h-24 object-cover cursor-pointer border border-gray-300 rounded-lg mb-4"
        />
      </label>
      <input
        type="file"
        id="image"
        hidden
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {/* Title */}
      <p className="text-xl mb-2">Blog title</p>
      <input
        type="text"
        placeholder="Type here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full max-w-[800px] mb-4 px-4 py-3 border border-gray-300 rounded-lg outline-none"
        required
      />

      {/* Subtitle */}
      <p className="text-xl mb-2">Sub title</p>
      <input
        type="text"
        placeholder="Type here"
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        className="w-full max-w-[800px] mb-4 px-4 py-3 border border-gray-300 rounded-lg outline-none"
        required
      />

      {/* Blog Description */}
      <p className="text-xl mb-2">Blog Description</p>
      <div className="max-w-[800px] mb-4">
        <div
          ref={editorRef}
          className="bg-white border border-gray-300 rounded-lg"
          style={{ height: "180px" }}
        ></div>
        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={generateContent}
            disabled={loading}
            className="bg-primary text-white bg-blue-600 text-sm font-medium px-5 py-2 rounded-lg cursor-pointer hover:opacity-90 shadow-sm"
          >
            Generate with AI
          </button>
        </div>
      </div>

      {/* Category */}
      <p className="text-xl mb-2">Blog category</p>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-44 mb-4 px-4 py-2.5 border border-gray-300 rounded-lg bg-white outline-none"
      >
        <option value="" disabled>
          Select category
        </option>
        {blogCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Publish Toggle */}
      <label className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
        />
        Publish Now
      </label>

      {/* Submit */}
      <button
        disabled={isAdding}
        type="submit"
        className="bg-blue-600 text-white px-8 py-2.5 rounded-full cursor-pointer hover:opacity-90"
      >
        {isAdding ? "Adding..." : "Add Blog"}
      </button>
    </form>
  );
};

export default AddBlogs;
