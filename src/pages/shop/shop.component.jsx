import React from 'react'

import { connect } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// import CollectionPage from '../collection/collection.component';
// import WithSpinner from '../../components/with-spinner/with-spinner.component';
// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';


// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // state = {
    //     loading: true
    // };

    // unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;

        fetchCollectionsStartAsync();


        // const { updateCollections } = this.props;
        // const collectionRef = collection(firestore, 'collections');

    // using API
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-db7c0/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections))

    // using firestore
        // collectionRef.get().then( snapShot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot)

        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

    // using observer
        // onSnapshot( collectionRef, async (snapShot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot)

        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });
    }

    render() {
        // const { loading } = this.state;

        // const { isCollectionsFetching, isCollectionsLoaded } = this.props

        return (
            <div className="shop-page" >
                <Routes>
                    <Route path={`/*`} element={<Outlet />} >
                        <Route index element={<CollectionsOverviewContainer />} />
                        <Route path={`:collectionId`} element={ <CollectionPageContainer /> } />
                    </Route>
                    {/* <Route path={`/*`} element={<Outlet />} >
                        <Route index element={ <CollectionsOverviewWithSpinner isLoading={isCollectionsFetching}/> } />
                        <Route path=':collectionId' element={<CollectionsPageWithSpinner isLoading={!isCollectionsLoaded}/>} />
                    </Route> */}
                </Routes>
                {/* <CollectionsOverviewWithSpinner isLoading={loading} /> */}
            </div>
        )
    }
};

// const mapStateToProps = createStructuredSelector({
//     isCollectionsFetching: selectIsCollectionsFetching,
//     isCollectionsLoaded: selectIsCollectionsLoaded
// })

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);