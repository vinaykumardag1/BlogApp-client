import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Button} from "@mui/material"
const BlogData = () => {
  const [blog, setBlog] = useState([]);
  // const [disabled,setDisabled]=useState(false)
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blog');
        setBlog(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  const user=localStorage.getItem("userId")
  // if(!user){
  //   setDis(true)
  // }

  return (
   
    <div className="p-6 font-sans">
      <div className="flex justify-end p-5">
        <Button variant="contained" color="success"
         href="/createblog"
         className="text-right px-3.5 py-5 bg-amber-600 text-white rounded-4xl "
      
         >Create your Blog</Button>
        {/* <Link to="/createblog"className="text-right px-3.5 py-5 bg-amber-600 text-white rounded-4xl " >Create your Blog</Link> */}
      </div>
      
      {blog.map((blog) => ( 
        <div key={blog._id} className="flex justify-center items-center  bg-gray-100">
        <div  className="w-1/2 border-b overflow-hidden border-gray-300 mb-6 pb-6">
          <h3 className="text-3xl  text-gray-800">{blog.title}</h3>
          {blog.image && (
            <img
              className="mt-4 w-full  h-auto"
              src={`http://localhost:3000${blog.image.path}`}
              alt={blog.title}
            />
          )}
          <p className="text-lg text-gray-600 mt-4 text-justify">{blog.content}</p>
        </div>
        </div>
      ))}
    </div>
  );
};

export default BlogData;
