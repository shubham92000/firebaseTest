import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <Loading />;
  }
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" replace={true} />
  ) : (
    children
  );
};

export default PrivateRoute;
