import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import MenuItem from './components/menu-item/menu-item.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

function App() {
  return (
    <div>
        <Routes>
          <Route exact path='/'element={<HomePage />} />
          <Route path='/:menuId'element={<MenuItem />} />
          <Route path='/shop'element={<ShopPage />} />
        </Routes>
    </div>
  );
}

export default App;
