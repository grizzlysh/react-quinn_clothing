import { createSelector } from "reselect";

// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    (collections) => collections ? Object.keys(collections).map( key => collections[key] ) : []
)

export const selectCollection = collectionURLParam => 
    createSelector(
        [selectCollections],
        (collections) => collections ? collections[collectionURLParam] : null
        // (collections) => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionURLParam])
    )

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
)