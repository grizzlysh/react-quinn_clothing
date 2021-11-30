import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MenuItem from './components/menu-item/menu-item.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils'


class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged( user => {
      this.setState({ currentUser: user });

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()

  }
  

  render() {
    return (
      <div>
          <Header currentUser={ this.state.currentUser }/>
          <Routes>
            <Route exact path='/'element={<HomePage />} />
            <Route path='/:menuId'element={<MenuItem />} />
            <Route path='/shop'element={<ShopPage />} />
            <Route path='/signin'element={<SignInAndSignUpPage />} />
          </Routes>
      </div>
    );
  }
}

export default App;
