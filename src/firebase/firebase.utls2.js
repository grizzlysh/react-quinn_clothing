import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyDg4Q02V7zobEM42lxq-0KptOTkN6AP_Hs",
    authDomain: "crwn-db-db7c0.firebaseapp.com",
    projectId: "crwn-db-db7c0",
    storageBucket: "crwn-db-db7c0.appspot.com",
    messagingSenderId: "203620665203",
    appId: "1:203620665203:web:66d41389531a76cc7c6706",
    measurementId: "G-KTM87MHW69"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;