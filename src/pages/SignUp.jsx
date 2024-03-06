import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset error messages
    setEmailError("");
    setPasswordError("");
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;
    if (!password || !strongPasswordRegex.test(password)) {
      setPasswordError(
        "Password must be between 6 and 30 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }

    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      console.error(err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists. Please login.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/94eb5ad7-10d8-4cca-bf45-ac52e0a052c0/IN-en-20240226-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="///"
        />
        <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />
        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/60 rounded-lg">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-nsans-bold">Sign Up</h1>
              <form
                onSubmit={handleFormSubmit}
                className="w-full flex flex-col py-4"
              >
                <input
                  className={`p-3 my-2 bg-gray-700 rounded ${
                    emailError || error ? "border border-red-500" : ""
                  }`}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && (
                  <p className="text-red-500 text-sm">{emailError}</p>
                )}
                <input
                  className={`p-3 my-2 bg-gray-700 rounded ${
                    passwordError ? "border border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">
                  Sign Up
                </button>

                <div className="flex justify-between items-center text-center text-gray-600">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={rememberLogin}
                      onChange={() => setRememberLogin(!rememberLogin)}
                    />
                    Remember me
                  </label>
                  <p>Need Help?</p>
                </div>
                <p className="my-4">
                  <span className="text-gray-600 mr-2">
                    Already subscribed to Netflix?
                  </span>
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;