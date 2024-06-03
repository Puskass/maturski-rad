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
      className="max-w-xs mx-auto mt-20 py-10 px-4 flex flex-col justify-center items-center border rounded-md bg-white shadow-lg"
    >
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        className="border rounded-sm outline-none py-2 px-3 mb-4 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        autoComplete="off"
        placeholder="Šifra"
        className="border rounded-sm outline-none py-2 px-3 mb-4 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-8 py-2 font-semibold rounded-md hover:bg-blue-700 transition-colors w-full mb-4">
        Prijavi se
      </button>
      <p className="text-center text-sm font-semibold py-1 text-gray-600">
        Prijavi se sa Emailom i šifrom ili pomoću Google
      </p>
      <GoogleButton onClick={handleGoogleSignIn} className="w-full mb-4">
        {" "}
        Nastavi pomoću Googla
      </GoogleButton>
      <p className="text-center text-sm font-semibold py-1 text-gray-600">
        Nemaš račun?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Napravi jedan ovdje
        </Link>
        .
      </p>
    </form>
  );
};

export default SignIn;
