import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className='theFooter'>

<Link to='/'><img style={{ textDecoration: 'none', color: 'inherit', overflow: 'hidden' }} src='/MogulLogo.png' alt='the mogo logo' className='footerHomeLogo'></img></Link>


            <nav>
                <ul>
                <Link to="/" style={{ textDecoration: 'none'}}><li className='footerList'>Home</li></Link>
                <Link to="/" style={{ textDecoration: 'none'}}><li className='footerList'>Apparel</li></Link>
                <Link to="/shirts" style={{ textDecoration: 'none'}}><li className='footerList'>Other</li></Link>
                <Link to="/shirts" style={{ textDecoration: 'none'}}><li className='footerList'>Shirts</li></Link>
                <Link to="/sneakers" style={{ textDecoration: 'none'}}><li className='footerList'>Sneakers</li></Link>
                <Link to="/pants" style={{ textDecoration: 'none'}}><li className='footerList'>Pants</li></Link>
                <Link to="/hoodies" style={{ textDecoration: 'none'}}><li className='footerList'>Hoodies</li></Link>
                <Link to="/dresses" style={{ textDecoration: 'none'}}><li className='footerList'>Dresses</li></Link>
                <Link to="/skirts" style={{ textDecoration: 'none'}}><li className='footerList'>Skirts</li></Link>
                <Link to="/sets" style={{ textDecoration: 'none'}}><li className='footerList'>Sets</li></Link>
                <Link to="/about" style={{ textDecoration: 'none'}}><li className='footerList'>About</li></Link>
                <Link to="/privacyPolicy" style={{ textDecoration: 'none'}}><li className='footerList'>Privacy Policy</li></Link>
                <Link to="/control" style={{ textDecoration: 'none'}}><li className='footerList'>Control</li></Link>
                </ul>
            </nav>




        </footer>
    )
}

export default Footer;