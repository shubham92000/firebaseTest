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
      <button onClick={onSubmitLogout}>Log Out</button>
      <button onClick={onSubmitDeleteAccount}>Delete Account</button>
    </>
  );
};

export default Home;
