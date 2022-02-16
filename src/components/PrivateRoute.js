import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  return children;
  // return !isAuthenticated && !loading ? (
  //   <Navigate to="/login" replace={true} />
  // ) : (
  //   children
  // );
};

export default PrivateRoute;
