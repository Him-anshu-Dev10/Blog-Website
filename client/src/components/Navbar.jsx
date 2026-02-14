import { useAppContext } from "../context/appContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-center items-center py-8 mx-8 h sm:mx-20 xl:mx-32 cursor-pointer gap-250">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 "
      />

      <button
        onClick={() => navigate(token ? "/admin" : "/login")}
        className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-600 text-white px-10 py-2.5 "
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} className=" w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
