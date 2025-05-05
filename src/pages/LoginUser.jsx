import React, { useState } from "react";
import axios from "axios";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );
      setFormData({
        email: "",
        password: "",
      });

      console.log("User Login:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-gray-950 flex justify-center gap-10 items-center min-h-screen px-4">
      <div className="w-[35%]">
        <img
          className="rounded-2xl w-[100%]"
          src="/images/login.avif"
          alt="Registraion Illustration"
        />
      </div>
      <form className="w-[45%]  space-y-4" onSubmit={handleSubmitRegisterUser}>
        <h1 className="text-white text-3xl ">Login Form</h1>

        <div>
          <label className="text-gray-300 block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="text-gray-300 block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
