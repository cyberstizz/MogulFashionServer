import React from "react";
import './SettingsPopup.scss'
import { Link } from "react-router-dom";


const SettingsPopup = () => {
    return(
      <Link to='/'> <nav className="fullSettingsPopupBlock">
        <header></header>
        <Link to='/'><img style={{ textDecoration: 'none', color: 'inherit', overflow: 'hidden' }} src='/MogulLogo.png' height="auto" alt='the mogo logo' className='thisHomeLogo'></img></Link>
        <ul classname>
        <Link to="/" style={{ textDecoration: 'none'}}><li className="settingsLink">Home</li></Link>
        <Link to="/pants" style={{ textDecoration: 'none'}}><li className="settingsLink">Pants</li></Link>
        <Link to="/sneakers" style={{ textDecoration: 'none'}}><li className="settingsLink">Sneakers</li></Link>
        <Link to="/hoodies" style={{ textDecoration: 'none'}}><li className="settingsLink">hoodies</li></Link>
        <Link to="/dresses" style={{ textDecoration: 'none'}}><li className="settingsLink">dresses</li></Link>
        <Link to="/skirts" style={{ textDecoration: 'none'}}><li className="settingsLink">skirts</li></Link>
        <Link to="/sets" style={{ textDecoration: 'none'}}><li className="settingsLink">sets</li></Link>

        </ul>


        </nav></Link> 
    )
}

export default SettingsPopup;