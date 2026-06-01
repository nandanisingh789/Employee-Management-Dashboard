import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function LoginPage() {
  const { login } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ username: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "Username is required";
    if (!form.password)        e.password = "Password is required";
    else if (form.password.length < 4) e.password = "Min 4 characters";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setApiError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (ev) => {
    setForm((p) => ({ ...p, [field]: ev.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setApiError("");
  };

  return (
    <div className="min-h-screen flex dark:bg-gray-950 bg-gray-50 transition-colors duration-300">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-brand-600 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #818cf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a5b4fc 0%, transparent 50%)" }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg">E</div>
            <span className="text-white font-bold text-xl tracking-tight">EmpDesk</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-6">
            Manage your<br />team smarter.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            A powerful dashboard to track, manage, and grow your workforce — all in one place.
          </p>
        </div>
        <div className="relative z-10 flex gap-4">
          {[["30+","Employees"], ["5","Departments"], ["Real-time","Updates"]].map(([n,l]) => (
            <div key={l} className="bg-white/10 rounded-2xl px-5 py-4 flex-1 text-center">
              <div className="text-white font-bold text-xl">{n}</div>
              <div className="text-brand-200 text-xs mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Theme toggle */}
        <button onClick={toggle} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-lg hover:scale-105 transition-transform">
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome back</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Hint box */}
          <div className="mb-6 p-4 rounded-xl bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700">
            <p className="text-sm text-brand-700 dark:text-brand-300 font-medium">
              🔑 Demo credentials: <span className="font-bold">emilys</span> / <span className="font-bold">emilyspass</span>
            </p>
          </div>

          {apiError && (
            <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 text-sm animate-slide-in">
              ⚠️ {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={set("username")}
                placeholder="Enter username"
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all
                  ${errors.username ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-brand-500 dark:focus:border-brand-400"}`}
              />
              {errors.username && <p className="mt-1.5 text-xs text-red-500">{errors.username}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all
                    ${errors.password ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-brand-500 dark:focus:border-brand-400"}`}
                />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg">
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-semibold text-base transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </>
              ) : "Sign in →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
