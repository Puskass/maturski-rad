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
    <div className="text-center">
      <button
        onClick={handleSignOut}
        className="bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors"
      >
        Odjavi se
      </button>
    </div>
  );
};

export default SignOut;
