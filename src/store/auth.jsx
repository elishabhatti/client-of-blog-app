import axios from "axios";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const LogoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/logout",
        {},
        { withCredentials: true }
      );
      console.log("Logout successful:", response.data);
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <AuthContext.Provider value={{ LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
