import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { storeTokenIns } = useAuth();

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData,
        {
          withCredentials: true,
        }
      );

      storeTokenIns(response.data.token);
      setFormData({ email: "", password: "" });

      navigate("/");
      toast.success("User Logged In!");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
      console.error("Login error:", errorMessage);
    }
  };

  return (
    <div className="bg-white flex justify-center gap-10 items-center pt-40 p-5 text-gray-800">
      <div className="w-[35%]">
        <img
          className="rounded-2xl w-full"
          src="/images/login.avif"
          alt="Login Illustration"
        />
      </div>
      <form className="w-[40%] space-y-4" onSubmit={handleSubmitLoginUser}>
        <h1 className="text-3xl font-semibold">Login Form</h1>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-md transition"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
