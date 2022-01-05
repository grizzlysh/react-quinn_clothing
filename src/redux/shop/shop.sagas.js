import { takeLatest, call, put, all } from 'redux-saga/effects'
import { collection, getDocs } from "firebase/firestore";
import {convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";

import { ShopActionTypes } from './shop.types'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.action';

export function* fetchCollectionsAsync() {
    yield console.log('i am fired');

    try {

        const collectionRef = collection(firestore, 'collections');
        const snapShot = yield getDocs(collectionRef);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);    
        yield put(fetchCollectionsSuccess(collectionsMap));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ])
}