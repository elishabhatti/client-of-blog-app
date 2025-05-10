import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SquarePen } from "lucide-react";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 fixed w-full px-8 p-3 shadow-md z-50">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold hover:text-blue-900">
          <NavLink to="/">Blog App</NavLink>
        </h1>

        <nav>
          <ul className="flex gap-6 text-base font-medium items-center">
            {isLoggedIn && (
              <>
                <li>
                  <NavLink to="/write" className="hover:text-indigo-600">
                    <div className="flex gap-2 items-center">
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

            <li>
              <NavLink to="/save" className="hover:text-indigo-600">
                Saved Articles
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
              <>
                <li>
                  <NavLink to="/logout" className="hover:text-indigo-600">
                    Logout
                  </NavLink>
                </li>

                <li className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="hover:text-indigo-600 focus:outline-none"
                  >
                    Profile ▾
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border">
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 hover:bg-indigo-50"
                      >
                        Settings
                      </NavLink>
                      <NavLink
                        to="/stories"
                        className="block px-4 py-2 hover:bg-indigo-50"
                      >
                        Stories
                      </NavLink>
                      <NavLink
                        to="/library"
                        className="block px-4 py-2 hover:bg-indigo-50"
                      >
                        Library
                      </NavLink>
                      <NavLink
                        to="/stats"
                        className="block px-4 py-2 hover:bg-indigo-50"
                      >
                        Stats
                      </NavLink>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
