import './App.scss';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './components/Footer'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import MainRoutes from './components/MainRoutes';


function App() {

const [storeMode, setStoremode] = useState('apparelMode');




  return (
    <Router>  
      <ScrollToTop />
      <header className="topSection">
            <Link to='/settingsMenu' style={{ textDecoration: 'none', color: 'inherit', overflow: 'hidden' }}><img src='/MogulLogo.png' width="100" height="auto" alt='the mogo logo' className='homeLogo'></img></Link>
            { storeMode === 'apparelMode' ? (
            <React.Fragment>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><button onClick={() => setStoremode('apparelMode')} className='ApparelButton'>Apparel</button></Link>
            <Link to='/pants' style={{ textDecoration: 'none', color: 'inherit' }}><button onClick={() => setStoremode('otherMode')} className='clothesButton'>Other</button></Link> 
            </React.Fragment>
            ) : (
            <React.Fragment>
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}><button onClick={() => setStoremode('apparelMode')} className='otherApparelButton'>Apparel</button></Link>
            <Link to='/pants' style={{ textDecoration: 'none', color: 'inherit' }}><button onClick={() => setStoremode('otherMode')} className='otherClothesButton'>Other</button></Link>
            </React.Fragment>
            )}
       </header>
        <MainRoutes />
      <Footer />
    </Router>
);
}

export default App;
