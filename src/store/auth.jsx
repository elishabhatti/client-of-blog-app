import axios from "axios";
import { createContext, useContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const LogoutUser = async () => {
        const response = await axios.post("http://localhost:3000/api/users/logout")
        console.log(response);
        
    }
    return (
        <AuthProvider.Provider value={LogoutUser}>
            {children}
        </AuthProvider.Provider>
    )
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(authContextValue) {
        throw new Error("useAuth used outside the Provider")
    }
    return authContextValue
}