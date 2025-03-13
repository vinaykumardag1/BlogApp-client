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
    <div className='flex justify-between w-full p-10'>
      <h1>BlogApp</h1>
      <div className='flex gap-4'>
        {/* Show Login/Register only if user is NOT logged in */}
        {!userId && (
          <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
        )}
        {/* Show User Name if logged in */}
        {userdata && (
          <div>
            <Link to='/'>Home</Link>
            <Link to="/myblogs" className='px-2'>My Blogs</Link>
            <span className='px-2'>HI! {userdata.name}</span>
            
            <button className='ml-3 px-4 cursor-pointer text-white bg-red-500 py-2 rounded-xl' onClick={Logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
