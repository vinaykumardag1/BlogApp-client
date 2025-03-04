import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import {Button} from "@mui/material"
import Card from './card'
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
        <Card blog={blog} key={blog._id} />
      ))}
    </div>
  );
};

export default BlogData;
