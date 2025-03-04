import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email: formData.email,
                password: formData.password,
            });
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            toast.success(response.data.message);
            navigate('/');
        } catch (error) {
            if(error.response.data.message==="invalid credentials"){
                toast.warning("invalid credentials")
            }else{
            toast.error(error.response.data.message || 'An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const styles={
        flex:'flex justify-center items-center h-screen bg-gray-100',
        form:'bg-white p-8 rounded-lg shadow-md w-full max-w-sm',
        input:'w-full p-2 border border-gray-300 rounded-md',
        button:'w-full p-2 mt-4 bg-blue-500 text-white rounded cursor-pointer',
    }

    return (
        <div className={styles.flex}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
                <div className='mb-4'>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        onChange={handleChange}
                        name='email'
                        value={formData.email}
                        required
                        className={styles.input}
                    />
                </div>
                <div className='mb-6'>
                    <input
                        type="password"
                        placeholder='Enter your password'
                        onChange={handleChange}
                        name='password'
                        value={formData.password}
                        required
                        className={styles.input}
                    />
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Login;
