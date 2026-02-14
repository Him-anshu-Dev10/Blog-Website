import React from "react";
import { useNavigate } from "react-router-dom";

// Corrected prop destructuring: { blog }
const Blogcard = ({ blog }) => {
  // Destructure properties from the 'blog' object
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      // Corrected onClick handler to use navigate and _id
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-blue-500 duration-300 cursor-pointer" // Added a shade to hover:shadow-blue
    >
      <img src={image} alt={title} className="aspect-video" />{" "}
      {/* Added alt text */}
      <span
        // Corrected px-3py-1 to px-3 py-1
        // Corrected bg-blue to bg-blue-100 (example shade)
        // Corrected text-blue to text-blue-700 (example shade)
        className="ml-5 mt-4 px-3 py-1 inline-block bg-blue-100 rounded-full text-blue-700 text-xs"
      >
        {category}
      </span>
      <div className="p-4">
        {" "}
        {/* Added padding to the div containing text for better spacing */}
        <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
        <p
          className="mb-3 text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>{" "}
        {/* Added ellipsis */}
      </div>
    </div>
  );
};

export default Blogcard;
