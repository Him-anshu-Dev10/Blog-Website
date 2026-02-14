import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success("Login Successful");

        localStorage.setItem("token", data.token);
        setToken(data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Login Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 animate-gradient-shift" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating circle */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-float-reverse" />

        {/* Small floating particles */}
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-white/40 rounded-full animate-particle-1" />
        <div className="absolute top-1/3 left-20 w-3 h-3 bg-white/30 rounded-full animate-particle-2" />
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white/25 rounded-full animate-particle-3" />
        <div className="absolute top-2/3 right-20 w-2 h-2 bg-white/50 rounded-full animate-particle-4" />
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-white/35 rounded-full animate-particle-5" />
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl animate-fade-in-up
                   bg-white/10 backdrop-blur-xl border border-white/20
                   shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
                   hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                   transition-all duration-500 ease-out"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-bounce-gentle">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
          Welcome Back
        </h2>
        <p className="text-center text-white/60 mb-8 text-sm">
          Sign in to your admin dashboard
        </p>

        {/* Email Input */}
        <div className="mb-5 relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${emailFocused || email ? "text-blue-400" : "text-white/40"}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="Email address"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-white/40
                       outline-none transition-all duration-300
                       focus:border-blue-400/50 focus:bg-white/10
                       focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          />
        </div>

        {/* Password Input */}
        <div className="mb-2 relative">
          <div
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${passwordFocused || password ? "text-blue-400" : "text-white/40"}`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="Password"
            required
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl
                       text-white placeholder-white/40
                       outline-none transition-all duration-300
                       focus:border-blue-400/50 focus:bg-white/10
                       focus:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-white/50 hover:text-blue-400 transition-all duration-300
                       relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] 
                       after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 px-6 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                     bg-[length:200%_auto] bg-left
                     hover:bg-right hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                     active:scale-[0.98]
                     transition-all duration-500 ease-out
                     disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                     relative overflow-hidden group"
        >
          <span
            className={`transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
          >
            Sign In
          </span>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Back to Home */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full py-3 px-6 rounded-xl font-medium text-white/70
                     bg-white/5 border border-white/10
                     hover:bg-white/10 hover:text-white hover:border-white/20
                     transition-all duration-300"
        >
          Back to Home
        </button>
      </form>

      {/* Custom Styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.1); }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(20px, -20px); }
          50% { transform: translate(40px, 20px); }
          75% { transform: translate(-20px, 40px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(50px, -40px) rotate(10deg); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 12s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 18s ease-in-out infinite reverse;
        }
        
        .animate-particle-1 {
          animation: particle-float 4s ease-in-out infinite;
        }
        
        .animate-particle-2 {
          animation: particle-float 5s ease-in-out infinite 0.5s;
        }
        
        .animate-particle-3 {
          animation: particle-float 6s ease-in-out infinite 1s;
        }
        
        .animate-particle-4 {
          animation: particle-float 4.5s ease-in-out infinite 1.5s;
        }
        
        .animate-particle-5 {
          animation: particle-float 5.5s ease-in-out infinite 2s;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;
