import React from "react"
import { useNavigate } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";
import { CollectionPreviewContainer, CollectionPreviewTitleContainer, PreviewContainer } from "./collection-preview.styles";

// import './collection-preview.styles.scss'


const CollectionPreview = ({ title, items, routeName }) => {
    
    let navigate = useNavigate();

    return (
        <CollectionPreviewContainer>
            <CollectionPreviewTitleContainer
                onClick={ () => navigate(`/shop/${routeName}`) }
            >
                { title.toUpperCase() }
            </CollectionPreviewTitleContainer>
            <PreviewContainer>
                {
                    items
                        .filter((item, idx) => (idx < 4))
                        .map( (item) => (
                            <CollectionItem key={item.id} item={item} />
                        ))
                }
            </PreviewContainer>
        </CollectionPreviewContainer>
    )
};


export default CollectionPreview