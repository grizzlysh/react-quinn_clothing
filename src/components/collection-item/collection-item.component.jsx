import React from "react"
import { connect } from "react-redux"
import { addItem } from "../../redux/cart/cart.actions"

// import './collection-item.styles.scss'
import { AddButton, BackgroundImage, CollectionFooterContainer, CollectionItemContainer, CollectionSpanName, CollectionSpanPrice } from "./collection-item.styles"


const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
    <CollectionItemContainer>
        <BackgroundImage
            // className="image"
            imgUrl={imageUrl}
            // style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <CollectionFooterContainer>
            <CollectionSpanName>{ name }</CollectionSpanName>
            <CollectionSpanPrice>{ price }</CollectionSpanPrice>
        </CollectionFooterContainer>
        <AddButton onClick={ () => addItem(item) }inverted >Add to Cart</AddButton>
    </CollectionItemContainer>)
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);