import React from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selector'

import './collection.styles.scss'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { CollectionItemsContainer, CollectionPageContainer, CollectionTitle } from './collections.styles'

const CollectionPage = () => {
    let   params           = useParams();
    const collection       = useSelector(selectCollection(params.collectionId));
    const { title, items } = collection;

    return (
        <CollectionPageContainer>
            <CollectionTitle>{ title }</CollectionTitle>
            <CollectionItemsContainer>
                {
                    items.map( item => 
                        (<CollectionItem key={item.id} item={item} />) 
                    )
                }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

// const mapStateToProps = (reducer, ownProps) => {
//     console.log(ownProps)
//     let params = useParams();
//     console.log(params);
//     // console.log(reducer);
//     return (
//         {
//             collection: 'hats'
//         // selectCollection(ownProps.collection)
//         }
//     )
// }

export default CollectionPage
