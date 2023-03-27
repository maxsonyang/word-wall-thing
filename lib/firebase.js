import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2X10ChUiaRCcEU7L4WkehCC3jVrW4SB0',
  authDomain: 'word-wall-thing.firebaseapp.com',
  projectId: 'word-wall-thing',
  storageBucket: 'word-wall-thing.appspot.com',
  messagingSenderId: '825574855217',
  appId: '1:825574855217:web:c85708f0313b6b4234bb10',
};

// Sometimes firebase initializes multiple times in NEXT.
if (!firebase.apps.length) {
  firebase.default.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
