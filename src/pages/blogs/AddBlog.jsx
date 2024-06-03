import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogsCollectionRef = collection(db, "blogs");
  let navigate = useNavigate()
  
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await addDoc(blogsCollectionRef, {
        title,
        description,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      });
      navigate("/")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleAddBlog}
      className="bg-green-300 flex flex-col justify-center items-center"
    >
      <input type="Title" onChange={(e) => setTitle(e.target.value)} />
      <input
        type="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Post Blog</button>
    </form>
  );
};

export default AddBlog;
