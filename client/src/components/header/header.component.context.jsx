import React, { useContext, useState } from 'react'

import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
// import './header.styles.scss'
import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartContext from '../../contexts/cart/cart.context';
import { signOutStart } from '../../redux/user/user.actions';
import { selectHiddenCart } from '../../redux/cart/cart.selector';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CurrentUserContext from '../../contexts/current-user/current-user.context';
import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from './header.styles';

const Header = ({ signOutStart }) => {
    const currentUser = useContext(CurrentUserContext);
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden);

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
                <CartContext.Provider value={{
                    hidden, toggleHidden
                }}>
                    <CartIcon />
                </CartContext.Provider>
                {
                    // currentUser!=null && (<div className="option">{currentUser.displayName}</div>)
                }
            </OptionsContainer>
            {
                !hidden && <CartDropdown />
            }
        </HeaderContainer>
    )
}

// state = root reducer
const mapStateToProps = createStructuredSelector({
    hiddenCart: selectHiddenCart
})

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);