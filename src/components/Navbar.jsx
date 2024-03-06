import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";
import brand from "../assets/brand.png";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="absolute w-full p-4 flex flex-col sm:flex-row items-center justify-between z-50">
      <Link to="/" className="flex items-center">
        <img
          src={brand}
          alt="Netflix"
          className="w-24 md:w-32 lg:w-40 xl:w-48 h-auto"
        />
      </Link>

      <div className="flex mt-4 sm:mt-0">
        {user?.email ? (
          <>
            <Link to="/profile">
              <button className="capitalize mr-4 p-2 font-nsans-medium">Profile</button>
            </Link>
            <button
              className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer font-nsans-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="capitalize mr-4 p-2 font-nsans-medium">LogIn</button>
            </Link>
            <Link to="/signup">
              <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer font-nsans-medium">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;