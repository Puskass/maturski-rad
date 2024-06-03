import React, { useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogsCollectionRef = collection(db, "blogs");
  const { user } = useUserAuth();
  const navigate = useNavigate();

  const handleAddBlog = async () => {
    try {
      await addDoc(blogsCollectionRef, {
        title,
        description,
        userId: user?.uid, // Ensure userId is correctly set
      });
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
<div className="container mx-auto px-4 py-8">
      <h1 className="text-center mb-4 text-3xl font-bold">Pozdrav, {user.email}!</h1>
      <div className="mx-auto mt-20 py-10 flex flex-col justify-center items-center max-w-xs border rounded-md shadow-md bg-white">
        <input
          type="text"
          placeholder="Naslov"
          required
          className="border rounded-sm outline-none w-60 py-2 px-4 mb-4 "
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Opis..."
          required
          className="border rounded-sm outline-none py-2 mb-4 px-4 w-60 max-h-40 resize-none"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-8 py-2 font-semibold rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddBlog}
        >
          Dodaj Blog
        </button>
      </div>
    </div>
  );
};

export default Blogs;
