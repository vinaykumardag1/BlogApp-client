import React, { useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.warning('Passwords do not match');
        }else{
        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    }
    };

    const styles={
        flex:'flex justify-center items-center h-screen bg-gray-100',
        form:'bg-white p-8 rounded-lg shadow-md w-full max-w-sm',
        input:'w-full p-2 my-2 border border-gray-300 rounded-md',
        button:'w-full p-2 mt-4 bg-blue-500 text-white rounded hover:cursor-pointer',
    }
    return (
      <>
        <div className='flex justify-center items-center h-screen bg-gray-100'>
            <div className=''>
                <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
           
            <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>
                <input
                    type="text"
                    placeholder='Enter your name'
                    onChange={handleChange}
                    name='name'
                    value={formData.name}
                    className={styles.input}
                    required
                />
                <input
                    type="email"
                    placeholder='Enter your email'
                    onChange={handleChange}
                    name='email'
                    value={formData.email}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder='Enter your password'
                    onChange={handleChange}
                    name='password'
                    value={formData.password}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder='Confirm your password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    required
                    className={styles.input}
                />
                <button type='submit' className={styles.button}>Submit</button>
            </form>
        </div>
        <ToastContainer/>
        </div>
      </>
    );
};

export default Register;
