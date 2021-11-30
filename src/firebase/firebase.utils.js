import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDg4Q02V7zobEM42lxq-0KptOTkN6AP_Hs",
    authDomain: "crwn-db-db7c0.firebaseapp.com",
    projectId: "crwn-db-db7c0",
    storageBucket: "crwn-db-db7c0.appspot.com",
    messagingSenderId: "203620665203",
    appId: "1:203620665203:web:66d41389531a76cc7c6706",
    measurementId: "G-KTM87MHW69"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
// export const firestore = firebase.firestore();
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => firebase.auth().signInWithPopUp(provider);

export const signInWithGoogle = () => (signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    })
);

export default firebase;
