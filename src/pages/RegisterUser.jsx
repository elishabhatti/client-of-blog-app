import React, { useState } from "react";
import axios from "axios";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );
      setFormData({ username: "", email: "", password: "" });
      console.log("User registered:", response.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="bg-white flex justify-center gap-10 mt-20 items-center p-5 text-gray-800">
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
