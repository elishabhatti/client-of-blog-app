import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

const LogoutUser = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();
    };
    performLogout();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};

export default LogoutUser;
