import React from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectHiddenCart } from '../../redux/cart/cart.selector';

const Header = ({ currentUser, hiddenCart }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser ? 
                    <div className="option" onClick={ () => auth.signOut() }>SIGN OUT</div>
                    :
                    <Link className="option" to="/signin">SIGN IN</Link>
                }
                <CartIcon />
                {
                    // currentUser!=null && (<div className="option">{currentUser.displayName}</div>)
                }
            </div>
            {
                !hiddenCart && <CartDropdown />
            }
            
        </div>
    )
}

// state = root reducer
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hiddenCart: selectHiddenCart
})

export default connect(mapStateToProps)(Header);