import React from 'react'
import { connect } from 'react-redux'
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'
import { CheckoutItemContainer, CheckoutItemImageContainer, CheckoutItemQuantityContainer, CheckoutItemRemoveButtonContainer, CheckoutItemTextContainer } from './checkout-item.styles'

// import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <img alt="item" src={imageUrl} />
            </CheckoutItemImageContainer>
            <CheckoutItemTextContainer>{name}</CheckoutItemTextContainer>
            <CheckoutItemQuantityContainer>
                <div onClick={ () => removeItem(cartItem) }>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={ () => addItem(cartItem) }>&#10095;</div>
            </CheckoutItemQuantityContainer>
            <CheckoutItemTextContainer>{price}</CheckoutItemTextContainer>
            <CheckoutItemRemoveButtonContainer onClick={ () => clearItem(cartItem) }>
                &#10005;
            </CheckoutItemRemoveButtonContainer>
        </CheckoutItemContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)
