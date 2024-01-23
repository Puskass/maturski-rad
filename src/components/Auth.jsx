import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut,  } from "firebase/auth";
import { Link } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
  }
  return (
    <div className="max-w-xs mx-auto mt-20 py-10 flex flex-col justify-center items-center">
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
      <button
        className="bg-blue-200 px-8 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:transition-colors"
        onClick={signIn}
      >
        Sign In
      </button>
      <p className="text-center text-sm font-semibold py-1 text-gray-300">Sign in with email and password or with Google</p>
      <button
        onClick={signInWithGoogle}
        className="my-2 bg-blue-200 px-8 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:transition-colors"
      >
        Sign In with Google
      </button>
      <p className="text-center text-sm font-semibold py-1 text-gray-500">
        Don't have an account <span className="text-blue-600"> <Link to='/signup'>Create one here</Link>.</span> 
      </p>
        <button className="my-2 bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors" onClick={logOut}>Sign Out</button>
    </div>
  );
};

export default Auth;
