import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cart.selector';
import { useNavigate} from 'react-router';

import CartItem from '../cart-item/cart-item.component'
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { CartDropdownButton, CartDropdownContainer, CartDropdownSpanMessage, CartItemsContainer } from './cart-dropdown.sfyles';


const CartDropdown = () => {
    const navigate  = useNavigate();
    const cartItems = useSelector(selectCartItems)
    const dispatch  = useDispatch();

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

export default CartDropdown;