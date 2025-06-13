import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-extrabold text-yellow-500 tracking-widest">404</h1>
      <div className="bg-yellow-500 px-2 text-sm rounded rotate-12 absolute mt-[-3rem]">
        Page Not Found
      </div>
      <p className="text-gray-600 mt-8 text-lg md:text-xl">
        Oops! Your page was not found.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-yellow-500 hover:bg-yellow-600 transition-all rounded-md text-sm md:text-base"
      >
        return home
      </Link>
    </div>
  );
};

export default ErrorPage;
