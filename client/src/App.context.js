import React, { Component } from 'react';

import { onSnapshot } from 'firebase/firestore';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import CurrentUserContext from './contexts/current-user/current-user.context';

import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null;

  componentDidMount(){    
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      
      if (userAuth) {
        // this.setState({ currentUser: user });
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot( userRef, (snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      else{
        this.setState({ currentUser: userAuth });
      }
    }, error => console.log(error))
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
          <CurrentUserContext.Provider value={this.state.currentUser}>
            <Header />
          </CurrentUserContext.Provider>
          <Routes>
            <Route exact path='/'element={<HomePage />} />
            {/* <Route path='/:menuId'element={<MenuItem />} /> */}
            <Route path='/shop/*'element={<ShopPage />} />
            {/* <Route path='/shop'element={<CollectionsOverview />} />           */}
            {/* <Route path='/shop/:categoryId'element={<CollectionPage />} /> */}
            <Route exact path='/checkout'element={<CheckoutPage />} />
            <Route exact path='/signin' element={
              <SignInWrapper currentUser={this.state.currentUser}>
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

export default App;
