import { checkingCredentials, logout, login } from './authSlice';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    console.log({ result });

    if (!result.ok) {
      dispatch(logout(result.errorMessage));
    } else {
      dispatch(login(result));
    }
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const { ok, uid, photoUrl, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
    if (!ok) {
      return dispatch(logout(errorMessage));
    }

    dispatch(login({ uid, displayName, email, photoUrl }));
  };
};

export const startLoginWithEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await loginWithEmailPassword(email, password);
    if (!result.ok) {
      dispatch(logout(result.errorMessage));
    } else {
      dispatch(login(result));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
  };
};
