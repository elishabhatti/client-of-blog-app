import React from "react";
import { NavLink } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="bg-white text-gray-800 fixed w-full px-8 p-3 shadow-md">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog App</h1>
        <nav>
          <ul className="flex gap-6 text-base font-medium">
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/write" className="hover:text-indigo-600">
                    <div className="flex gap-3">
                      <SquarePen />
                      Write
                    </div>
                  </NavLink>
                </li>
                <li>|</li>
              </>
            )}

            <li>
              <NavLink to="/" className="hover:text-indigo-600">
                Home
              </NavLink>
            </li>

            {!isLoggedIn && (
              <>
                <li>
                  <NavLink to="/register" className="hover:text-indigo-600">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="hover:text-indigo-600">
                    Login
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && (
              <li>
                <NavLink to="/logout" className="hover:text-indigo-600">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
