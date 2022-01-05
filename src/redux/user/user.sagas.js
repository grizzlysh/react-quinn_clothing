import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from "../../firebase/firebase.utils";
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from "./user.actions";


import UserActionTypes from "./user.types";

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield call(getDoc, userRef);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        const userRef = yield call(createUserProfileDocument,user);
        const userSnapshot = yield call(getDoc, userRef);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth){
            return;
        }
        else {
            const userRef = yield call(createUserProfileDocument,userAuth);
            const userSnapshot = yield call(getDoc, userRef);
            yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ])
}