import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { app } from '../../firebase/config';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AUTH_ERROR, LOAD_USER, LOGIN, LOGOUT, REGISTER_ERROR } from '../types';

const AuthState = (props) => {
  const auth = getAuth(app);

  const initialState = {
    user: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = () => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log(user);
          dispatch({
            type: LOAD_USER,
            payload: user,
          });
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      },
      (err) => {
        dispatch({
          type: AUTH_ERROR,
        });
      }
    );
  };

  const login = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({
          type: LOGIN,
          payload: user,
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({
          type: AUTH_ERROR,
        });
      });
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({
          type: REGISTER_ERROR,
        });
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: LOGOUT,
        });
      })
      .catch((err) => {
        console.log('log out err');
      });
  };

  return (
    <authContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        loadUser,
        login,
        register,
        logout,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
