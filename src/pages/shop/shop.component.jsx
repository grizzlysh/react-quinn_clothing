import React from 'react'

import { connect } from 'react-redux';
import { collection, onSnapshot } from 'firebase/firestore';
import { updateCollections } from '../../redux/shop/shop.action';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from '../collection/collection.component';
import { Outlet, Route, Routes } from 'react-router-dom';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = collection(firestore, 'collections');

        onSnapshot( collectionRef, async (snapShot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot)

            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="shop-page" >
                <Routes>
                    {/* <Route path={`/shop`} element={ (props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} /> } >
                        <Route path={`:collectionId`} element={ (props) => <CollectionsPageWithSpinner isLoading={loading} {...props} />} />
                    </Route> */}
                    <Route path={`/*`} element={<Outlet />} >
                        <Route index element={ <CollectionsOverviewWithSpinner isLoading={loading}/> } />
                        <Route path=':collectionId' element={<CollectionsPageWithSpinner isLoading={loading}/>} />
                    </Route>
                </Routes>
                {/* <CollectionsOverviewWithSpinner isLoading={loading} /> */}
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);