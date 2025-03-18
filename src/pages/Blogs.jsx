import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const BlogDetail = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
        setBlog(response.data); // Expecting an object, not an array
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-10 text-xl">Loading...</p>;

  // Ensure blog.content is defined before calling split()
  const paragraphs = blog.content ? blog.content.split("\n") : [];

  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {blog.image && blog.image.path && (
        <img
          src={`http://localhost:3000${blog.image.path}`}
          alt={blog.title}
          className="w-full h-auto  rounded-lg my-4"
        />
      )}

      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-lg text-gray-600 mt-4 selection:bg-cyan-400 selection:text-white">
          {paragraph}
        </p>
      ))}
    </div>
    </>
  );
};

export default BlogDetail;
