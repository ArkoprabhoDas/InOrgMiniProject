import React, { useState, useEffect } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import google_icon from '../Assets/google.png';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import bcrypt from "bcryptjs-react"
import { setSessionCookie } from '../../Session/session';

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
        </div>
      </form>
      
    </div>
  );
};

const LoginSignup = () => {
  const navigate = useNavigate();
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
  const [ user, setUser ] = useState([]);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    // Handle signup submission logic
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
          const responseLogin = await axios.post("http://localhost:8081/login",{email : email});
          if(Object.keys(responseLogin.data).length === 0){
            await axios.post("http://localhost:8081/registers",{
              email: email,
              password: hash
            });
            setSessionCookie({email : email});
            navigate("/booking");
          }
          else{
            console.log("user already exist");
            navigate("/");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Handle login submission logic
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const responseLogin = await axios.post("http://localhost:8081/login",{email : email});
      if(Object.keys(responseLogin.data).length === 0){
        console.log("User does not exist");
        navigate("/");
      }
      else{
        const hash = responseLogin.data.password;
        bcrypt.compare(password, hash, function(err, result) {
          if(result){
            setSessionCookie({email : email});
            navigate("/booking");
          }
          else{
            navigate("/");
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });
  useEffect(
    () => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                })
                .then(async (res) => {
                  const profile = res.data;
                  try {
                    const result = await axios.post("http://localhost:8081/login",{email : profile.email});
                    if(Object.keys(result.data).length === 0){
                      const user = await axios.post("http://localhost:8081/registers",{
                          email: profile.email,
                          password: "google"
                        });
                        setSessionCookie({email : profile.email});
                        navigate("/booking");
                    }
                    else{
                      setSessionCookie({email : profile.email});
                      navigate("/booking");
                    }
                  }
                  catch(err){
                    console.log(err);
                  }
                    console.log(res);
                })
                .catch((err) => console.log(err));
        }
    },
    [ user ]
);

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
          
        />
      )}
      <div className="switch-form">
        <button className="switch-btn" onClick={() => setCurrentForm('SignUp')}>Sign Up</button>
        <button className="switch-btn" onClick={() => setCurrentForm('Login')}>Login</button>
        <button onClick={login}>Sign in with Google 🚀 </button>
      </div>
    </>
  );
};


export default LoginSignup;
