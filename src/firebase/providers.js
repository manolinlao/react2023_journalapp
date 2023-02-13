import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FireBaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FireBaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    // console.log({ credentials });
    const user = result.user;
    console.log(user);
    const { displayName, email, photoURL, uid } = user;
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    const errorMessage = error.message;
    return {
      ok: false,
      errorMessage
    };
  }
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    //TODO: actualizar el displayName en firebase
    await updateProfile(FireBaseAuth.currentUser, { displayName });

    console.log(resp);
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    console.log('loginWithEmailPassword');
    const resp = await signInWithEmailAndPassword(FireBaseAuth, email, password);
    console.log(resp.user);
    return {
      ok: true,
      uid: resp.user.uid,
      photoURL: resp.user.photoURL,
      email: resp.user.email,
      displayName: resp.user.displayName
    };
  } catch (error) {
    console.log(error.message);
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const logoutFirebase = async () => {
  return await FireBaseAuth.signOut();
};
