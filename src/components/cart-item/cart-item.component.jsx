import React from 'react'
import { CartItemContainer, CartItemImage, ItemDetailsContainer, CartItemSpanName } from './cart-item.styles';

// import './cart-item.styles.scss'

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt="item" />
            <ItemDetailsContainer>
                <CartItemSpanName>{name}</CartItemSpanName>
                <span>{quantity} x ${price}</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem;
