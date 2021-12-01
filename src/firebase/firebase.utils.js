import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
// import 'firebase/compat/firestore'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
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

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const docRef = doc(firestore, "users",userAuth.uid);
    // console.log(docRef);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap);
    if (!docSnap.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(docRef, {
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
        // console.log("No such document!");
    }
    
    return docRef;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => firebase.auth().signInWithPopUp(provider);

export const signInWithGoogle = () => (signInWithPopup(auth, provider)
    .then((result) => {
        // // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // // The signed-in user info.
        // const user = result.user;
        // // ...
    }).catch((error) => {
        // // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // // ...
    })
);

export default firebase;
