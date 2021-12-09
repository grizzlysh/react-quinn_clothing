import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import './App.css';
import Header from './components/header/header.component';
import MenuItem from './components/menu-item/menu-item.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
      if (userAuth) {
        // this.setState({ currentUser: user });
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot( userRef, (snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      else{
        setCurrentUser(userAuth);
      }
      
      // console.log(this.currentUser);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()

  }
  

  render() {
    const SignInWrapper = ({ children, currentUser }) => {
      return currentUser ? <Navigate to="/" replace /> : children;
    };

    return (
      <div>
          <Header />
          <Routes>
            <Route exact path='/'element={<HomePage />} />
            <Route path='/:menuId'element={<MenuItem />} />
            <Route path='/shop'element={<ShopPage />} />
            <Route exact path='/checkout'element={<CheckoutPage />} />
            <Route exact path='/signin' element={
              <SignInWrapper currentUser={this.props.currentUser}>
                <SignInAndSignUpPage />
              </SignInWrapper>
            } />
            
            {/* <Route exact path='/signin' render={ () => 
              (this.props.currentUser) ? <Navigate to="/" /> :  <SignInAndSignUpPage /> } /> */}
            {/* <Route exact path='/signin'element={<SignInAndSignUpPage />} /> */}
          </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
