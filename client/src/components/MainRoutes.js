// MainRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sneakers from './Sneakers';
import Pants from './Pants';
import Hoodies from './Hoodies';
import Dresses from './Dresses';
import Skirts from './Skirts';
import Shirts from './Shirts';
import Sets from './Sets';
import ProductPage from './ProductPage';
import SettingsPopup from './SettingsPopup';
import PrivacyPolicy from './PrivacyPolicy';
import About from './About';

function MainRoutes() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sneakers' element={<Sneakers />} />
        <Route path='/pants' element={<Pants />} />
        <Route path='/hoodies' element={<Hoodies />} />
        <Route path='/dresses' element={<Dresses />} />
        <Route path='/skirts' element={<Skirts />} />
        <Route path='/sets' element={<Sets />} />
        <Route path='/shirts' element={<Shirts />} />
        <Route path='/products/:productId' element={<ProductPage />} />
        <Route path='/settingsMenu' element={<SettingsPopup />} />
        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
        <Route path='/about' element={<About />} />  
     </Routes>
  );
}

export default MainRoutes;