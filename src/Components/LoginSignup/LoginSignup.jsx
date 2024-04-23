import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import google_icon from '../Assets/google.png';

const SignupForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="text"> Sign Up</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
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
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

const LoginForm = ({ formData, handleChange, handleSubmit, handleGoogleSignup }) => {
  return (
    <div className="container">
      <div className="header">
        <div className="text"> Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
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
          <button type="submit" className="submit">Login</button>
          <button type="button" className="submit gray" onClick={handleGoogleSignup}>
            <img src={google_icon} alt="Google" style={{ height: '30px', marginRight: '10px' }} />
            Login with Google
          </button>
        </div>
      </form>
    </div>
  );
};

const LoginSignup = () => {
  const [signupFormData, setSignupFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [currentForm, setCurrentForm] = useState('SignUp');

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup submission logic
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login submission logic
  };

  const handleGoogleSignup = () => {
    // Add your Google signup logic here
  };

  return (
    <>
      {currentForm === 'SignUp' ? (
        <SignupForm
          formData={signupFormData}
          handleChange={handleSignupChange}
          handleSubmit={handleSignupSubmit}
        />
      ) : (
        <LoginForm
          formData={loginFormData}
          handleChange={handleLoginChange}
          handleSubmit={handleLoginSubmit}
          handleGoogleSignup={handleGoogleSignup}
        />
      )}
      <div className="switch-form">
        <button className="switch-btn" onClick={() => setCurrentForm('SignUp')}>Sign Up</button>
        <button className="switch-btn" onClick={() => setCurrentForm('Login')}>Login</button>
      </div>
    </>
  );
};

export default LoginSignup;
