import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './register.css'; // Import your CSS file

function MyForm() {
  const [data, setData] = useState({
    user_name: '',
    password: '',
    c_password: '',
    id: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/posts')
      .then((response) => console.log(response))
      .catch((error) => console.error('Error fetching data:', error));
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

    if (!data.user_name) {
      errors.push('Please enter the User name');
      toast.error("Please enter the User name");
    }
    if (!data.password) {
      errors.push('Please enter the Password');
      toast.error("Please enter the Password");
    }
    if (!data.email) {
      errors.push('Please enter the Email');
      toast.error("Please enter the Email");
    }
    if (!data.c_password) {
      errors.push('Please Confirm Password');
      toast.error("Please Confirm Password");
    }
    if (data.c_password !== data.password) {
      errors.push('Password must be the same');
      toast.error("Password must be the same");
    }

    if (errors.length > 0) {
      // toast.error(` ${errors.join('\n')}`);
      return;
    }

    axios
      .post('http://localhost:3001/posts', data)
      .then((response) => {
        console.log(response.data);
        toast.success('Data added successfully!');
      })
      .catch((error) => console.error('Error posting data:', error));
    setData({
      user_name: '',
      password: '',
      c_password: '',
      id: '',
    });
  };

  return (
    <div className="register-container">
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
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>Name</label>
        <input
          type="text"
          name="user_name"
          value={data.user_name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="id"
          value={data.id}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="c_password"
          value={data.c_password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <Link to="/login" className="login-link">
        Already have an account? Login here.
      </Link>
    </div>
  );
}

export default MyForm;
