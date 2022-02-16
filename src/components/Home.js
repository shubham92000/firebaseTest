import React from 'react';
import { useDispatch } from 'react-redux';
import { logout, deleteAccount } from '../action/auth';

const Home = () => {
  const dispatch = useDispatch();
  const onSubmitLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const onSubmitDeleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteAccount());
  };

  return (
    <>
      Home
      <form onSubmit={onSubmitLogout}>
        <input type="submit" value="Logout" />
      </form>
      <form onSubmit={onSubmitDeleteAccount}>
        <input type="submit" value="Delete Account" />
      </form>
    </>
  );
};

export default Home;
