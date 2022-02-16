import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout, deleteAccount } from '../action/auth';
import Loading from './Loading';

const Home = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onSubmitLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const onSubmitDeleteAccount = (e) => {
    e.preventDefault();
    dispatch(deleteAccount());
  };

  if (loading) {
    return <Loading />;
  }

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
