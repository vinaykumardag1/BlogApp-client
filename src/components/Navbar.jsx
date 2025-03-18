import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [userdata, setUserdata] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const userDetail = async () => {
      try {
        if (!userId) return; // Prevent API call if no user is logged in

        const { data } = await axios.get(`http://localhost:3000/api/user/${userId}`);
        setUserdata(data.user); // Extract user object
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    userDetail();
  }, [userId]); // Dependency to re-fetch if userId changes

  const Logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className='flex justify-between items-center w-full p-6 bg-blue-600 text-white shadow-md'>
      <h1 className='text-3xl font-bold'>BlogApp</h1>
      <div className='flex gap-4'>
        {/* Show Login/Register only if user is NOT logged in */}
        {!userId && (
          <div className='flex gap-4'>
            <Link to='/' className='px-3 py-2 rounded hover:bg-blue-700 transition-colors'>Home</Link>
            <Link to='/login' className='px-3 py-2 rounded hover:bg-blue-700 transition-colors'>Login</Link>
            <Link to='/register' className='px-3 py-2 rounded hover:bg-blue-700 transition-colors'>Register</Link>
          </div>
        )}
        {/* Show User Name if logged in */}
        {userdata && (
          <div className='flex items-center gap-4'>
            <Link to='/' className='px-3 py-2 rounded hover:bg-blue-700 transition-colors'>Home</Link>
            <Link to="/myblogs" className='px-3 py-2 rounded hover:bg-blue-700 transition-colors'>My Blogs</Link>
            <span className='px-3 py-2 rounded bg-blue-700'>{`Hi, ${userdata.name}`}</span>
            <button
              className='ml-3 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors'
              onClick={Logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
