import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const blogsCollectionRef = collection(db, "blogs");
  
  const getBlogList = async () => {
    try {
      const data = await getDocs(blogsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogList(filteredData);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteBlog = async (id) => {
    const blogDoc = doc(db, "blogs", id);
    await deleteDoc(blogDoc);
  };
  useEffect(() => {
    getBlogList();
  }, []);

  return (
    <div>
      <h2>Rendering Blogs</h2>
      {blogList.map((blog) => (
        <div key={blog.id}>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>

          <button
            className="bg-red-200 px-8 py-2 font-semibold rounded-md hover:bg-red-600 hover:text-white hover:transition-colors"
            onClick={() => deleteBlog(blog.id)}
          >
            Delete Blog
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
