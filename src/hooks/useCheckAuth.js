import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FireBaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(FireBaseAuth, async (user) => {
      console.log('onAuthStateChanged', user);
      if (!user) {
        return dispatch(logout());
      } else {
        const { uid, email, displayName, photoURL } = user;
        dispatch(login({ uid, email, displayName, photoURL }));
        dispatch(startLoadingNotes());
      }
    });
  }, []);

  return { status };
};
