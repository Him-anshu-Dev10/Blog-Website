import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const { axios, navigate } = useAppContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`/api/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      if (data.success) {
        setResetSuccess(true);
        toast.success(data.message);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const EyeIcon = ({ show, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-300"
    >
      {show ? (
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
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          />
        </svg>
      ) : (
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  );

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
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-white/25 rounded-full animate-particle-2" />
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
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        {!resetSuccess ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center text-white mb-2 tracking-tight">
              Reset Password
            </h2>
            <p className="text-center text-white/60 mb-8 text-sm">
              Enter your new password below
            </p>

            {/* New Password */}
            <div className="mb-5 relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${passwordFocused || password ? "text-emerald-400" : "text-white/40"}`}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                placeholder="New password (min 6 chars)"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl
                           text-white placeholder-white/40
                           outline-none transition-all duration-300
                           focus:border-emerald-400/50 focus:bg-white/10
                           focus:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              />
              <EyeIcon
                show={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6 relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${confirmFocused || confirmPassword ? "text-emerald-400" : "text-white/40"}`}
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
                placeholder="Confirm new password"
                required
                minLength={6}
                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-xl
                           text-white placeholder-white/40
                           outline-none transition-all duration-300
                           focus:border-emerald-400/50 focus:bg-white/10
                           focus:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              />
              <EyeIcon
                show={showConfirm}
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>

            {/* Password strength indicator */}
            {password && (
              <div className="mb-6 animate-fade-in-up">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        password.length >= i * 3
                          ? password.length >= 12
                            ? "bg-green-400"
                            : password.length >= 8
                              ? "bg-yellow-400"
                              : "bg-orange-400"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/40">
                  {password.length < 6
                    ? "Too short"
                    : password.length < 8
                      ? "Fair"
                      : password.length < 12
                        ? "Good"
                        : "Strong"}
                </p>
              </div>
            )}

            {/* Reset Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-semibold text-white
                         bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500
                         bg-[length:200%_auto] bg-left
                         hover:bg-right hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]
                         active:scale-[0.98]
                         transition-all duration-500 ease-out
                         disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
                         relative overflow-hidden group"
            >
              <span
                className={`transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
              >
                Reset Password
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
              Password Reset!
            </h2>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Your password has been reset successfully.
              <br />
              Redirecting to login page...
            </p>
            <div className="w-8 h-8 border-2 border-white/20 border-t-green-400 rounded-full animate-spin mx-auto" />
          </div>
        )}

        {/* Divider */}
        {!resetSuccess && (
          <>
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/30 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

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
          </>
        )}
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
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ResetPassword;
