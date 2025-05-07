import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutUser = () => {
  const { LogoutUser } = useAuth();

  toast.success("Logout!");
  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();
    };
    performLogout();
  }, [LogoutUser]);

  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default LogoutUser;
