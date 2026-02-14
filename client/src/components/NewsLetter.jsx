import React from "react";

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never miss a Blog!</h1>

      <p className="md:text-lg text-gray-500 opacity-70 pb-8">
        Subscribe to get the latest Blog, new Tech, and exclusive news.
      </p>

      <form className="flex items-center justify-between w-full max-w-2xl md:h-12 h-12 border border-gray-300 rounded-full overflow-hidden">
        <input
          // Corrected texr-gray-500 to text-gray-500
          className="h-full outline-none w-full px-3 text-gray-500 bg-transparent"
          type="email"
          placeholder="Enter your email id"
          required
        />
        <button
          className="md:px-12 px-8 h-full text-white bg-blue-500 rounded-r-full hover:bg-blue-600 transition-colors duration-200 whitespace-nowrap"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
