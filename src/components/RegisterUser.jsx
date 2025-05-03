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

  const handleSubmitRegiserUser = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/user/register", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmitRegiserUser}>
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
