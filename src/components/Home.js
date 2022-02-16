import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../action/auth';

const Home = () => {
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      Home
      <form onSubmit={onSubmit}>
        <input type="submit" value="Logout" />
      </form>
    </>
  );
};

export default Home;
