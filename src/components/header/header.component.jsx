import React from 'react'
// import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectHiddenCart } from '../../redux/cart/cart.selector';
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styles';

const Header = ({ currentUser, hiddenCart }) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/contact">CONTACT</OptionLink>
                {
                    currentUser ? 
                    <OptionLink as='div' onClick={ () => auth.signOut() }>SIGN OUT</OptionLink>
                    :
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon />
                {
                    // currentUser!=null && (<div className="option">{currentUser.displayName}</div>)
                }
            </OptionsContainer>
            {
                !hiddenCart && <CartDropdown />
            }
        </HeaderContainer>
    )
}

// state = root reducer
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hiddenCart: selectHiddenCart
})

export default connect(mapStateToProps)(Header);