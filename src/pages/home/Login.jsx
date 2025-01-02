import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen } from "lucide-react";
import StateContext from "../../context/Context";

export default function Login() {
  const { setStatus } = useContext(StateContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.username || !formData.password) throw new Error("All fields are required");

      setStatus({ error: "", isLoading: true, success: "" });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: "post",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStatus({ error: "", isLoading: false, success: "" });

      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setStatus({ error: err.message, isLoading: false, success: "" });
    }
  };

  return (
    <div className="min-h-full w-full p-6 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-emerald-500" />
          <span className="ml-2 text-2xl font-bold text-emerald-500">SHELF</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
        <p className="text-gray-600 mt-2">Please enter your credentials to access your library</p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input type="username" id="username" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Your username here..." value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input type="password" id="password" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Your password here..." value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </a>
            </div> */}

            <button type="submit" className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-200 font-medium">
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
