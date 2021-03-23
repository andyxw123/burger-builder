import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CHECK_STATE = 'AUTH_CHECK_STATE';

const apiKey = 'AIzaSyCzoUKaVj4cHQEZRtEQTVyi5ossKGSoJJI';

const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

export const authStart = () => {
  return { type: AUTH_START };
};

export const authSuccess = (userId, token) => {
  return {
    type: AUTH_SUCCESS,
    userId: userId,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authoriseAsync = (email, password, isSignup) => {
  return (dispatch) => {
    const authUrl = isSignup ? signUpUrl : signInUrl;

    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(authUrl, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expirationDate');

    if (!(userId && token && expiration)) {
      dispatch(authLogout());
      return;
    }

    const expirationDate = new Date(expiration);

    if (expirationDate < new Date()) {
      dispatch(authLogout());
      return;
    }

    dispatch(authSuccess(userId, token));

    //Need expiresIn in seconds
    const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;

    dispatch(checkAuthTimeout(expiresIn));
  };
};
