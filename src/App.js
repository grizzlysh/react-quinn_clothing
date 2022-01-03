import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Routes, Route, Navigate } from 'react-router-dom';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
// import { onSnapshot } from 'firebase/firestore';
// import { selectCollectionForPreview } from './redux/shop/shop.selector';
// import { auth, createUserProfileDocument } from './firebase/firebase.utils'

// import MenuItem from './components/menu-item/menu-item.component';
import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
// import CollectionPage from './pages/collection/collection.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
// import CollectionsOverview from './components/collections-overview/collections-overview.component';


class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount(){
    // const { setCurrentUser } = this.props;
    
    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
    //   if (userAuth) {
    //     // this.setState({ currentUser: user });
    //     const userRef = await createUserProfileDocument(userAuth);

    //     onSnapshot( userRef, (snapShot) => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   }
    //   else{
    //     setCurrentUser(userAuth);
    //   }

    //   // addCollectionAndDocuments('collections', collectionArray.map( ({title, items}) => ({title, items}) ))
      
    //   // console.log(this.currentUser);
    // }, error => console.log(error))
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
            {/* <Route path='/:menuId'element={<MenuItem />} /> */}
            <Route path='/shop/*'element={<ShopPage />} />
            {/* <Route path='/shop'element={<CollectionsOverview />} />           */}
            {/* <Route path='/shop/:categoryId'element={<CollectionPage />} /> */}
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
  currentUser: selectCurrentUser,
  // collectionArray: selectCollectionForPreview
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
