import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Button, Modal, TextField } from '@mui/material';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ title: '', content: '', image: null });
  const [blogToDelete, setBlogToDelete] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const getUserBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blog');
        if (Array.isArray(response.data)) {
          const filteredBlogs = response.data.filter(blog => blog.userId === userId);
          setUserBlogs(filteredBlogs);
        } else {
          setUserBlogs([]);
        }
      } catch (error) {
        console.log(error);
        setUserBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    getUserBlogs();
  }, [userId]);

  const handleOpen = (blog) => {
    setCurrentBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = (blogId) => {
    setBlogToDelete(blogId);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setBlogToDelete(null);
  };

  const handleUpdate = async (blogId) => {
    const formData = new FormData();
    formData.append('title', currentBlog.title);
    formData.append('content', currentBlog.content);
    if (currentBlog.image) {
      formData.append('image', currentBlog.image);
    }

    try {
      await axios.put(`http://localhost:3000/api/blog/${blogId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const updatedBlogs = userBlogs.map(blog => (blog._id === blogId ? { ...blog, ...currentBlog } : blog));
      setUserBlogs(updatedBlogs);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/blog/${blogToDelete}`);
      setUserBlogs(userBlogs.filter(blog => blog._id !== blogToDelete));
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-end p-5">
        <Button
          variant="contained"
          color="success"
          href="/createblog"
          className="text-right px-3.5 py-5 bg-amber-600 text-white rounded-4xl"
        >
          Create your Blog
        </Button>
      </div>
      {userBlogs.length > 0 ? (
        userBlogs.map((blog) => {
          const paragraphs = blog.content ? blog.content.split("\n") : [];
          return (
            <div key={blog._id} className="flex justify-center items-center bg-gray-100">
              <div className="w-1/2 border-b overflow-hidden border-gray-300 mb-6 pb-6">
                <h3 className="text-3xl text-gray-800">{blog.title}</h3>
                {blog.image && (
                  <img
                    className="mt-4 w-full h-auto"
                    src={`http://localhost:3000${blog.image.path}`}
                    alt={blog.title}
                  />
                )}
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-gray-600 mt-4 selection:bg-cyan-400 selection:text-white">
                    {paragraph}
                  </p>
                ))}
                <div className="mt-4 flex gap-4">
                  <button
                    className="flex items-center px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
                    onClick={() => handleOpen(blog)}
                  >
                    <FaEdit className="mr-2" /> Update
                  </button>
                  <button
                    className="flex items-center px-4 py-2 bg-red-500 cursor-pointer text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteOpen(blog._id)}
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No blogs found</div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 id="modal-modal-title" className="text-2xl mb-4">Update Blog</h2>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={currentBlog.title}
              onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
            />
            <TextField
              label="Content"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={currentBlog.content}
              onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setCurrentBlog({ ...currentBlog, image: e.target.files[0] })}
              className="mt-4"
            />
            <div className="mt-4 flex justify-end gap-4">
              <Button variant="contained" color="primary" onClick={() => handleUpdate(currentBlog._id)}>
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 id="delete-modal-title" className="text-2xl mb-4">Confirm Delete</h2>
            <p id="delete-modal-description" className="mb-4">Are you sure you want to delete this blog?</p>
            <div className="mt-4 flex justify-end gap-4">
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="contained" onClick={handleDeleteClose}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyBlogs;
