import React from 'react'
// import { Link } from 'react-router-dom';
// import { auth } from '../../firebase/firebase.utils'
import { connect } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss'
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import { signOutStart } from '../../redux/user/user.actions';
import { selectHiddenCart } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styles';

const Header = ({ currentUser, hiddenCart, signOutStart }) => {
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
                    // <OptionLink as='div' onClick={ () => auth.signOut() }>SIGN OUT</OptionLink>
                    <OptionLink as='div' onClick={signOutStart}>SIGN OUT</OptionLink>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);