import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route } from 'react-router-dom';
import Booking from './Components/booking/booking';
import PrivateRoutes from './Session/ProtectedRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<GoogleOAuthProvider clientId="149867876752-4cld03svld92jbgj8kuftn1nilnlps6p.apps.googleusercontent.com"><LoginSignup/></GoogleOAuthProvider>} />
        <Route element={<PrivateRoutes />}>
          <Route path="/booking" element={<Booking />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
