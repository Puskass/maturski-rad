import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";
import AddBlog from "../pages/blogs/AddBlog";

const Blogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogsCollectionRef = collection(db, "blogs");
  const { user } = useUserAuth();

  // const handleSignOut = async () => {
  //   try {
  //     await logOut();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleAddBlog = async (e) => {
    try {
      await addDoc(blogsCollectionRef, {
        title,
        description,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4 ">
        <span className="font-medium">Pozdrav </span>
        {user.email}!
      </h1>
      <h2></h2>
      <div className="mx-auto mt-20 py-10 flex flex-col justify-center items-center max-w-xs border rounded-md">
        <input
          type="Title"
          placeholder="Naslov"
          className="border rounded-sm outline-none py-1 px-3 mb-2"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="Description"
          placeholder="Opis..."
          className="border rounded-sm outline-none py-1 px-3 mb-2 max-w-xs"
          onChange={(e) => setDescription(e.target.value)}
        >
          </textarea>
        <button
          className="bg-blue-200 px-8 py-2 font-semibold rounded-md hover:bg-blue-600 hover:text-white hover:transition-colors"
          onClick={handleAddBlog}
        >
          Dodaj Blog
        </button>
      </div>
    </div>
  );
};

export default Blogs;
