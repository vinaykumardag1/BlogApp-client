import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
import Card from '../components/card';
import Navbar from '../components/Navbar';

const MyBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('userId');

  useEffect(() => {
    const getUserBlogs = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getUserBlogs/${id}`);
        setUserBlogs(response.data); // Assuming response.data.blogs contains the blogs array
       console.log(response.data)
      } catch (error) {
        // toast.error(error.response?.data?.message || 'Error fetching blogs');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserBlogs();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <Navbar/>
      {userBlogs.length > 0 ? (
        userBlogs.map((item) => <Card key={item._id} blog={item} />)
      ) : (
        <div>No blogs found</div>
      )}
     
    </div>
  );
};

export default MyBlogs;
