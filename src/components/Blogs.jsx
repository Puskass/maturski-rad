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
  const [blogList, setBlogList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const blogsCollectionRef = collection(db, "blogs");
  const { user, logOut } = useUserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };
  const getBlogList = async () => {
    try {
      const data = await getDocs(blogsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAddBlog = async (e) => {
    try {
      await addDoc(blogsCollectionRef, {
        title,
        description,
        userId: auth?.currentUser?.uid,
        postedAt: new Date(),
      });
      getBlogList();
    } catch (err) {
      console.error(err);
    }
  };
  const delelteBlog = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
  };
  useEffect(() => {
    getBlogList();
  }, []);

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      return timestamp.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else if (timestamp && timestamp.toDate instanceof Function) {
      // Convert Firestore timestamp to Date
      const date = timestamp.toDate();
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    } else {
      return "Invalid Date";
    }
  };

  return (
    <div>
      <h1>Hello {user.email}</h1>
      <button
        // onClick={handleSignOut}
        className="bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors"
      >
        Sign Out
      </button>
      <div className="bg-green-300 flex flex-col justify-center items-center">
        <input type="Title" onChange={(e) => setTitle(e.target.value)} />
        <input
          type="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleAddBlog}>Post Blog</button>
      </div>

      <h2>Rendering Blogs</h2>
      {blogList.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <h2>{formatDate(blog.postedAt)}</h2>
          <button
            className="bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors"
            onClick={() => delelteBlog(blog.id)}
          >
            Delete Blog
          </button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
