import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOAD_USER,
  ACCOUNT_DELETE,
} from '../action/types';

const initialState = {
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };

    default:
      return state;
  }
}

export default authReducer;
