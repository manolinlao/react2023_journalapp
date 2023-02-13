// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBCf_oH12v2aAms-geuXfuMEaBTFu9z_MA',
  authDomain: 'react-journal-app-e06f9.firebaseapp.com',
  projectId: 'react-journal-app-e06f9',
  storageBucket: 'react-journal-app-e06f9.appspot.com',
  messagingSenderId: '750500000346',
  appId: '1:750500000346:web:f07929d3343c9bd48c5e63'
};

// Initialize Firebase

export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
