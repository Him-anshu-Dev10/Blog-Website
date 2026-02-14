import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { axios, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/auth/forgot-password", { email });
      if (data.success) {
        setEmailSent(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
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
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl animate-float-fast" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute top-20 right-1/4 w-4 h-4 bg-white/40 rounded-full animate-particle-1" />
        <div className="absolute top-1/3 left-20 w-3 h-3 bg-white/30 rounded-full animate-particle-2" />
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white/25 rounded-full animate-particle-3" />
      </div>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 p-8 sm:p-10 rounded-2xl animate-fade-in-up
                      bg-white/10 backdrop-blur-xl border border-white/20
                      shadow-[0_8px_32px_rgba(0,0,0,0.3)]
                      hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]
                      transition-all duration-500 ease-out"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6 animate-bounce-gentle">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30">
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
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-center text-white/60 mb-8 text-sm">
              Enter your email and we'll send you a reset link
            </p>

            {/* Email Input */}
            <div className="mb-6 relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${emailFocused || email ? "text-orange-400" : "text-white/40"}`}
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
                placeholder="Enter your email address"
                required
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl
                           text-white placeholder-white/40
                           outline-none transition-all duration-300
                           focus:border-orange-400/50 focus:bg-white/10
                           focus:shadow-[0_0_20px_rgba(251,146,60,0.3)]"
              />
            </div>

            {/* Send Reset Link Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
                         bg-[length:200%_auto] bg-left
                         hover:bg-right hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]
                         active:scale-[0.98]
                         transition-all duration-500 ease-out
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                         relative overflow-hidden group"
            >
              <span
                className={`transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
              >
                Send Reset Link
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>
          </form>
        ) : (
          /* Success State */
          <div className="text-center animate-fade-in-up">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Check Your Email
            </h2>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              We've sent a password reset link to
              <br />
              <span className="text-white/80 font-medium">{email}</span>
            </p>
            <p className="text-white/40 text-xs mb-8">
              The link will expire in 15 minutes. Check your spam folder if you
              don't see it.
            </p>
            <button
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
              className="text-sm text-white/50 hover:text-orange-400 transition-all duration-300 underline underline-offset-4"
            >
              Didn't receive? Try again
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Back to Login */}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-3 px-6 rounded-xl font-medium text-white/70
                     bg-white/5 border border-white/10
                     hover:bg-white/10 hover:text-white hover:border-white/20
                     transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Login
        </button>
      </div>

      {/* Styles */}
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
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 15s ease infinite; }
        .animate-float-slow { animation: float-slow 20s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 15s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 12s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 18s ease-in-out infinite reverse; }
        .animate-particle-1 { animation: particle-float 4s ease-in-out infinite; }
        .animate-particle-2 { animation: particle-float 5s ease-in-out infinite 0.5s; }
        .animate-particle-3 { animation: particle-float 6s ease-in-out infinite 1s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ForgotPassword;
