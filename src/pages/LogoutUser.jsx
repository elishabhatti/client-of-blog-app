import React, { useEffect } from "react";
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutUser = () => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    toast.success("Logout!");
    LogoutUser();
  }, [LogoutUser]);

  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default LogoutUser;
