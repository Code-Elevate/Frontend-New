import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignInPage = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://code-elevate.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const authToken = res.headers.get("x-auth-token");
      const data = await res.json();

      if (res.status === 200 && authToken) {
        localStorage.setItem("x-auth-token", authToken);
        localStorage.setItem("x-user-data", JSON.stringify(data.user));
        localStorage.setItem("x-profile-data", JSON.stringify(data.profile));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="mt-1 py-1 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="mt-1 py-1 px-2 outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account?</span>{" "}
          <Link
            to="/signup"
            className="text-sm text-indigo-600 hover:underline"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
