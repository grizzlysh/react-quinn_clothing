import React from 'react';
import { connect } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selector';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router';

import CartItem from '../cart-item/cart-item.component'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartDropdownButton, CartDropdownContainer, CartDropdownSpanMessage, CartItemsContainer } from './cart-dropdown.sfyles';


const CartDropdown = ({ cartItems, dispatch }) => {
    const navigate = useNavigate();

    return (
        <CartDropdownContainer>
            <CartItemsContainer>
                {
                    cartItems.length ?
                    (
                        cartItems.map( cartItem => (
                            <CartItem key={cartItem.id} item={cartItem} />
                        ))
                    )
                    : 
                    (<CartDropdownSpanMessage>Your cart is empty</CartDropdownSpanMessage>)
                }
            </CartItemsContainer>
            <CartDropdownButton onClick={ () => {
                navigate('/checkout');
                dispatch(toggleCartHidden());
            }} >
                GO TO CHECKOUT
            </CartDropdownButton>
        </CartDropdownContainer>
    )
}

const mapStateToProps =  createStructuredSelector({
    // cartItems: reducer.cart.cartItems
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);