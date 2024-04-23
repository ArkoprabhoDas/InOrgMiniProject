import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import google_icon from '../Assets/google.png';

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [action, setAction] = useState('SignUp');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const handleGoogleSignup = () => {
    // Add your Google signup logic here
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text"> {action === 'SignUp' ? 'Sign Up' : 'Login'}</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          {action === 'SignUp' && (
            <div className="input">
              <img src={user_icon} alt="" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="submit-container">
          <button
            type="button"
            className={action === 'Login' ? 'submit gray' : 'submit'}
            onClick={() => setAction('SignUp')}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={action === 'SignUp' ? 'submit gray' : 'submit'}
            onClick={() => setAction('Login')}
          >
            Login
          </button>
          <button
            type="button"
            className="submit"
            onClick={handleGoogleSignup}
          >
            <img
              src={google_icon}
              alt="Google"
              style={{ height: '30px', marginRight: '10px' }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
