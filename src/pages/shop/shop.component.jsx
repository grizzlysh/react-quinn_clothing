import React from 'react'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CategoryPage from '../category/category.component';

const ShopPage = () => {
    return (
        <div className="shop-page" >
            {/* <Routes>
                <Route exact path={`${location.pathname}`} element={<CollectionsOverview />} />
                <Route path={`${location.pathname}/:categoryId`} element={<CategoryPage />} />
            </Routes> */}
            <CollectionsOverview />
        </div>
    )
};

export default ShopPage;