import React from 'react';
import { Navigate } from 'react-router-dom';

// Dummy auth function for example
const isAuthenticated = () => {
  // Replace this with your actual authentication logic (e.g., token check)
  return localStorage.getItem('token') ? true : false;
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/" replace />;
  }
  // Otherwise, render the child component
  return children;
};

export default ProtectedRoute;
