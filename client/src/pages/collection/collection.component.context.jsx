import React from 'react'
import { useParams } from 'react-router'

import './collection.styles.scss'
import CollectionsContext from '../../contexts/collections/collections.context'
import CollectionItem from '../../components/collection-item/collection-item.component'
import { CollectionItemsContainer, CollectionPageContainer, CollectionTitle } from './collections.styles'
import { useContext } from 'react'

const CollectionPage = () => {
    let   params           = useParams();
    const collections      = useContext(CollectionsContext);
    const collection       = collections[params.collectionId];
    const { title, items } = collection;
    return (
        // context way 1
        // <CollectionsContext.Consumer>
        // {
        //     collections => {
        //         const collection = collections[params.collectionId];
        //         const { title, items } = collection;
        //         return (
                    // <CollectionPageContainer>
                    //     <CollectionTitle>{ title }</CollectionTitle>
                    //     <CollectionItemsContainer>
                    //         {
                    //             items.map( item => 
                    //                 (<CollectionItem key={item.id} item={item} />) 
                    //             )
                    //         }
                    //     </CollectionItemsContainer>
                    // </CollectionPageContainer>
        //         )
        //     }
        // }
        // </CollectionsContext.Consumer>
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

export default CollectionPage
