import React from "react";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
  console.log(user);
  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <div className="cursor-pointer">
              <img
                src={logo}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
              />
            </div>
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        { isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, <span className="text-red-500">{user?.username}</span>!</div>
            <a
              onClick={logout}
              className="px-5 py-2 font-bold text-sm rounded text-blue-600 bg-lightGray hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link
              to="login"
              className="px-5 py-2 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Login
            </Link>
            <Link
              to="register"
              className="px-5 py-2 font-bold text-sm rounded text-blue-600 bg-lightGray hover:opacity-70"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
