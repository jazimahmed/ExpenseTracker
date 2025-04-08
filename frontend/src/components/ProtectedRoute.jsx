// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  //console.log(token);
  const isAuthenticated = token;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
