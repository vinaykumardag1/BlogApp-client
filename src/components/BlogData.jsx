import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "./card";

const BlogData = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blog");
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    fetchBlog();
  }, []);

  const user = localStorage.getItem("userId");

  return (
    <div className="p-6 font-sans">
      {user && (
        <div className="flex justify-end p-5">
          <Button variant="contained" color="success" href="/createblog">
            Create your Blog
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blog.map((post) => (
          <div key={post._id}>
            <Card blog={post} />
            <div className="mt-2 text-center">
              <Link to={`/blogs/${post._id}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogData;
