import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("x-auth-token")
  );
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signin");
  };

  const handleLogout = () => {
    localStorage.removeItem("x-auth-token");
    setIsLoggedIn(false);
    setUserEmail("");
    setIsLoggedOut(true);
  };
  const handleButtonClick = () => {
    alert("User should log in first");
  };

  useEffect(() => {
    if (isLoggedOut) {
      navigate("/signin");
    }
  }, [isLoggedOut, navigate]);

  return (
    <div className="gradient-bg p-4 flex justify-between items-center">
      {/* Logo and CodeElevate */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-8 w-8" />
        <a href="#" className="text-white ml-2">
          CodeElevate
        </a>
      </div>

      {/* Home and Problems */}
      <ul className="flex justify-center">
        <li className="mr-6">
          <a href="/" className="text-white hover:text-blue-800 cursor-pointer">
            Home
          </a>
        </li>
        {!isLoggedIn && (
          <li>
            <button
              className="text-white hover:text-blue-800 cursor-pointer"
              onClick={handleButtonClick}
            >
              Problems
            </button>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link
              to="/sampleProblems"
              className="text-white hover:text-blue-800 cursor-pointer"
            >
              Problems
            </Link>
          </li>
        )}
      </ul>

      {/* Logout/Login */}
      <ul className="flex justify-end">
        {isLoggedIn ? (
          <>
            <li className="mr-6">{userEmail}</li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-800"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleSignup}
              className="text-white hover:text-blue-800"
            >
              Log In
            </button>
          </li>
        )}
      </ul>

      <style>
        {`
          .gradient-bg {
            background-color: #667EEA; /* Fallback color */
            background-image: linear-gradient(to bottom, #667EEA, #764BA2); /* Vertical gradient */
          }
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default Navbar;
