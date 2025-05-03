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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );

      console.log("User registered:", response.data);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitRegisterUser}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInput}
          placeholder="Enter Your Username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInput}
          placeholder="Enter Your Email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInput}
          placeholder="Enter Your Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterUser;
