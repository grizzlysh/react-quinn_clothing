import React, { useEffect } from 'react'

import { connect } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.action';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';

const ShopPage = ({ fetchCollectionsStart }) => {

    useEffect( ()=>{
        fetchCollectionsStart();
    },[fetchCollectionsStart]);

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
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);