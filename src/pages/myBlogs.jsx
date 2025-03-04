import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/card';
import Navbar from '../components/Navbar';

const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]); // Ensure it's an array
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Get logged-in user ID

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const getUserBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blog');
        if (Array.isArray(response.data)) {
          // Filter blogs where the userId in the blog matches the logged-in user
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      {userBlogs.length > 0 ? (
        userBlogs.map((item) => <Card key={item._id} blog={item} />)
      ) : (
        <div>No blogs found</div>
      )}
    </div>
  );
};

export default MyBlogs;
