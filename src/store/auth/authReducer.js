import { createReducer } from '@reduxjs/toolkit';
import * as authActions from './authActions';

const initialState = {
  token: null,
  userId: null,
  isBusy: false,
  error: null,
};

const authStart = (state) => {
  Object.assign(state, {
    ...initialState,
    isBusy: true
  });
};

const authSuccess = (state, action) => {
  Object.assign(state, {
    token: action.token,
    userId: action.userId,
    isBusy: false,
    error: null
  });
};

const authFail = (state, action) => {
    Object.assign(state, {
        isBusy: false,
        error: action.error
      });
};

const authLogout = (state) => {
  Object.assign(state, {
    token: null,
    userId: null
  });
}

export default createReducer(initialState, {
  [authActions.AUTH_START]: authStart,
  [authActions.AUTH_SUCCESS]: authSuccess,
  [authActions.AUTH_FAIL]: authFail,
  [authActions.AUTH_LOGOUT] : authLogout
});
