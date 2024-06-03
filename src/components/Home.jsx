import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import { useUserAuth } from "../context/AuthContext";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const { user } = useUserAuth();
  const blogsCollectionRef = collection(db, "blogs");

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

  const deleteBlog = async (id) => {
    try {
      const blogDoc = doc(db, "blogs", id);
      if (user?.uid === blogList.find((blog) => blog.id === id)?.userId) {
        await deleteDoc(blogDoc);
        setBlogList(blogList.filter((blog) => blog.id !== id));
      } else {
        console.error("You are not authorized to delete this blog");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Blogs</h2>
      {user ? (
        blogList.length === 0 ? (
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700 mb-4">
              Nema blogova, dodaj svoj prvi blog.
            </p>
            <Link
              to="/blogs"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Dodaj Blog
            </Link>
          </div>
        ) : (
          blogList.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
              <p className="text-gray-700 mb-4">{blog.description}</p>
              {user?.uid === blog.userId && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Delete Blog
                </button>
              )}
            </div>
          ))
        )
      ) : (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Prijavite se da biste dodavali blogove.
          </p>
          <Link
            to="/signin"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Prijavi se
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
