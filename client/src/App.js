import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { selectCurrentUser } from './redux/user/user.selector';

import './App.css';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { checkUserSessions } from './redux/user/user.actions';

const App = () => {
  
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect( ()=>{ 
    dispatch(checkUserSessions());
  }, [dispatch]);

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
            <SignInWrapper currentUser={ currentUser }>
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

export default App;
