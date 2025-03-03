import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'; 

const Texteditro = () => {
  const [blog, setBlog] = useState({
    title: '',
    image: null,
    content: ''
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    });
  }

  function handleFileChange(e) {
    setBlog({
      ...blog,
      image: e.target.files[0]
    });
  }

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blog.title);
    formData.append('image', blog.image);
    formData.append('content', blog.content);

    // Retrieve user ID from local storage and append to formData
    const userId = localStorage.getItem('userId');
    formData.append('userId', userId);

    try {
      const response = await axios.post("http://localhost:3000/api/blog", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <ToastContainer />
      <form onSubmit={submit} encType="multipart/form-data" className="space-y-4">
        <input 
          type="text" 
          placeholder="Enter Title" 
          className="w-full p-2 border border-gray-300 rounded" 
          onChange={handleChange} 
          name="title" 
          value={blog.title} 
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          className="w-full p-2 border border-gray-300 rounded" 
          onChange={handleFileChange} 
          name="image" 
          required 
        />
        <textarea 
          id="content" 
          cols="30" 
          rows="10" 
          className="w-full p-2 border border-gray-300 rounded" 
          onChange={handleChange} 
          name="content" 
          value={blog.content} 
          required 
        ></textarea>
        <button 
          type="submit" 
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Texteditro;
