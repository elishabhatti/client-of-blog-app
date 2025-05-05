import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register", // Correct backend URL
        JSON.stringify(formData), // Stringify the form data
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Required for JSON data
          },
        }
      );

      setFormData({ username: "", email: "", password: "" });
      navigate("/");
      toast.success("User Registered!");
    } catch (error) {
      toast.error(error.message);
      console.error("Registration error:", error);
    }
  };
  return (
    <div className="bg-white flex justify-center gap-10 pt-40 items-center p-5 text-gray-800">
      <div className="w-[35%]">
        <img
          className="rounded-2xl w-full"
          src="/images/sign-up.jpg"
          alt="Registration Illustration"
        />
      </div>
      <form className="w-[45%] space-y-4" onSubmit={handleSubmitRegisterUser}>
        <h1 className="text-3xl font-semibold">Registration Form</h1>
        <div>
          <label className="block mb-1 font-medium" htmlFor="username">
            Username
          </label>
          <input
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInput}
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
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
            Password
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
