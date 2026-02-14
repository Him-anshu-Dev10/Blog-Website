import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/appContext";
const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = React.useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onclear = () => {
    setInput("");
    inputRef.current.value = "";
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border rounded-full text-sm">
          <p> New :AI feature integrated</p>

          <img src={assets.star_icon} className="w-2.5" alt="Star Icon" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-normal text-gray-700">
          Your own <span className="text-blue-700">blogging</span>
          <br /> platform.
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs">
          This is your space to think out loud ,to share what matters, and write
          without filters.Whether it's one word or thousand,your story starts
          right here.{" "}
        </p>
        <form
          onSubmit={submitHandler}
          action=""
          className="flex items-center w-full max-w-lg sm:max-w-lg mx-auto border border-gray-300 bg-white rounded-full overflow-hidden p-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for Blogs "
            required
            className="w-full pl-4 outline-none text-gray-700"
          />
          <button
            className="bg-blue-700 text-white px-6 py-2 rounded-full hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="text-center ">
        {input && (
          <button
            onClick={onclear}
            className="border font-light text-xs py-1  px-3 rounded-sm shadow-custom-sm cursor-pointer "
          >
            clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt="Background Gradient"
        className="absolute top-[12.5rem] left-1/2 -translate-x-1/2 w-full max-w-4xl -z-10 opacity-50"
      />
    </div>
  );
};

export default Header;
