import React from "react";
import { useUserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="text-center h-screen mt-10">
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-8 py-3 font-semibold rounded-md shadow-md hover:bg-red-600 transition-colors"
      >
        Odjavi se
      </button>
    </div>
  );
};

export default SignOut;
