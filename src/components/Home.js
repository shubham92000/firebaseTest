import React, { useEffect } from 'react';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Home = () => {
  const email = 'shubham@gmail.com';
  const password = '12345678';

  useEffect(() => {
    // createUserWithEmailAndPassword(auth, email, password)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }, []);
  return <div>Home</div>;
};

export default Home;
