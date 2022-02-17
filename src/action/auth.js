import { app } from '../firebase/config';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETE,
  LOAD_USER,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
} from './types';

export const loading = () => (dispatch) => {
  dispatch({
    type: LOAD_USER,
  });
};

// load user
export const loadUser = () => async (dispatch) => {
  const auth = getAuth(app);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({
        type: USER_LOADED,
        payload: user,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  });
};

// register
export const register = (email, password) => async (dispatch) => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({
        type: REGISTER_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: REGISTER_FAIL,
        payload: { errorCode, errorMessage },
      });
    });
};

// login user
export const login = (email, password) => async (dispatch) => {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: LOGIN_FAIL,
        payload: { errorCode, errorMessage },
      });
    });
};

// log out / clear
export const logout = () => async (dispatch) => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log('log out error');
  }
};

export const deleteAccount = () => async (dispatch) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  try {
    await deleteUser(user);
    dispatch({
      type: ACCOUNT_DELETE,
    });
  } catch (error) {
    console.log('could not delete account');
  }
};

export const googleLogin = () => async (dispatch) => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken; // oauth access token
      const user = result.user;
      dispatch({
        type: GOOGLE_LOGIN_SUCCESS,
        payload: user,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      dispatch({
        type: GOOGLE_LOGIN_FAIL,
        payload: {
          errorCode,
          errorMessage,
          email,
          credential,
        },
      });
    });
};
