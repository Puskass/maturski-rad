import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";

const Blogs = () => {
  const [blogList, setBlogList] = useState([]);
  const blogsCollectionRef = collection(db, "blogs");
  const { user, logOut } = useUserAuth();

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    const getBlogList = async () => {
      try {
        const data = await getDocs(blogsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setBlogList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getBlogList();
  }, []);

  return (
    <div>
      <h1>Blogs</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors"
      >
        Sign Out
      </button>
      <h2>Creating Blogs</h2>
      <div className="bg-green-300 flex flex-col justify-center items-center">
        <input type="Title" />
        <input type="Description" />
        <input type="time" />
      </div>

      <h2>Rendering Blogs</h2>
      {blogList.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
          <h3>
            Posted At {new Date(blog.postedAt.toDate()).toLocaleString()}{" "}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
