import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { signup } = useAuth() || { signup: async () => {} };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || formData.password.length < 6) {
      toast.error('Please enter valid data!');
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      toast.error('Failed to create account: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Enter Name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Enter Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <button type="submit" className="auth-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
