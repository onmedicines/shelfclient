import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BookOpen } from "lucide-react";
import { StateContext } from "../../context/StateContexts";

export default function Signup() {
  const { setStatus } = useContext(StateContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) throw new Error("Please enter all the fields");
      if (formData.password !== formData.confirmPassword) throw new Error("Passwords don't match");
      if (formData.password.length < 6) throw new Error("Password must be at least 6 characters");
      if (!formData.email.includes("@")) throw new Error("Please enter a valid email");

      console.log(formData); // to remove
      setStatus({ error: "", success: "", isLoading: true });
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setStatus({ error: "", success: "", isLoading: false });

      if (!response.ok) throw new Error(data.message);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setStatus({ error: err.message, success: "", isLoading: false });
    }
  };

  return (
    <div className="min-h-full w-full p-6 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 text-emerald-500" />
          <span className="ml-2 text-2xl font-bold text-emerald-500">SHELF</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        <p className="text-gray-600 mt-2">Join SHELF to start tracking your reading journey</p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input type="text" id="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input type="email" id="email" required className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${errors.email ? "border-red-500" : ""}`} placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input type="text" id="username" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Choose a username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input type="password" id="password" required className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${errors.password ? "border-red-500" : ""}`} placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input type="password" id="confirmPassword" required className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all ${errors.confirmPassword ? "border-red-500" : ""}`} placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="w-full mt-6 bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors duration-200 font-medium">
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-600 hover:text-emerald-500 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
