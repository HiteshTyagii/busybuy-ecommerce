import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import '../Register/RegisterPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth() || { login: async () => {} };
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || formData.password.length < 6) {
      toast.error('Please enter valid data');
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      toast.error('Please enter valid data');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
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
        <button type="submit" className="auth-btn">Sign In</button>
        <p className="redirect-text" onClick={() => navigate('/signup')}>
          Or SignUp instead
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
