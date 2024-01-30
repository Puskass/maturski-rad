import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContext";
import GoogleButton from "react-google-button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/blogs");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/blogs");
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xs mx-auto mt-20 py-10 flex flex-col justify-center items-center"
    >
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        placeholder="email"
        className="border rounded-sm outline-none py-1 px-3 mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        className="border rounded-sm outline-none py-1 px-3 mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-200 px-8 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:transition-colors">
        Sign In
      </button>
      <p className="text-center text-sm font-semibold py-1 text-gray-300">
        Sign in with email and password or with Google
      </p>
      <GoogleButton onClick={handleGoogleSignIn}>
        {" "}
        Sign In with Google
      </GoogleButton>

      <p className="text-center text-sm font-semibold py-1 text-gray-500">
        Don't have an account{" "}
        <span className="text-blue-600">
          {" "}
          <Link to="/signup">Create one here</Link>.
        </span>
      </p>
    </form>
  );
};

export default SignIn;
