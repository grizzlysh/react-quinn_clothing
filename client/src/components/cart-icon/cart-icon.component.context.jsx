import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'
import CartContext from '../../contexts/cart/cart.context'
import { selectCartItemsCount } from '../../redux/cart/cart.selector'

const CartIcon = ({ itemCount }) => {
    const { toggleHidden } = useContext(CartContext)

    return (
        <div className="cart-icon" onClick={toggleHidden}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

const mapStateToProps = (reducer) => ({
    // itemCount: reducer.cart.cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
    itemCount: selectCartItemsCount(reducer)
})

export default connect(mapStateToProps)(CartIcon);
