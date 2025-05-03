import React from "react";

const RegisterUser = () => {
  return (
    <div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter Your Username"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          required
        />
      </form>
    </div>
  );
};

export default RegisterUser;
