import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css'; 

function Login() {
  const [data, setData] = useState({
    password: '',
    email: '',
  });

  const nav = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = [];

    if (!data.password) {
      errors.push('Please enter the Password');
      toast.error('Please enter the Password');
    }
    if (!data.email) {
      errors.push('Please enter the email');
      toast.error('Please enter the email');
    }

    if (errors.length > 0) {
      // toast.error(` ${errors.join('\n')}`);
      return;
    }

    axios
      .get('http://localhost:3001/posts/' + data.email)
      .then((response) => {
        if (Object.keys(response).length === 0) {
          toast.error('Login failed');
        } else {
          const user = response.data;
          if (user.password === data.password) {
            sessionStorage.setItem('data', JSON.stringify(user.user_name));
            nav('/');
            setData({
              password: '',
              email: '',
            });
          } else {
            toast.error('Please enter a valid password');
          }
        }
      })
      .catch((error) => {
        toast.error('User Not Exists');
        console.error('Error posting data:', error);
      });
  };

  return (
    <div className="login-container">
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      <Link to="/Register" className="register-link">
        Register
      </Link>
    </div>
  );
}

export default Login;
