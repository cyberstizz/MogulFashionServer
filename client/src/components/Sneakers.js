import React, {useState, useEffect} from "react";
import './Sneakers.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";


const Sneakers = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

const handleImageLoaded = () => {
  setLoadedImagesCount(prevCount => prevCount + 1);
};

useEffect(() => {
  if (loadedImagesCount === 3) {
    setImagesLoaded(true);
  }
}, [loadedImagesCount]);
    

    return(
        <React.Fragment>
            {!imagesLoaded && <Loader />}

            <nav className='subMenuFullBlock'>
                <ul className='submenuHeader'>
                <Link to="/sneakers"><li className='submenuNavItem'>Sneakers</li></Link>
                <Link to="/pants"><li className='submenuNavItem'>Pants</li></Link>
                <Link to="/hoodies"><li className='submenuNavItem'>Hoodies</li></Link>
                </ul>
            </nav>
            <main className='submenuBody'>
            <Link to="/products/spades"><SubMenuComponent onImageLoad={handleImageLoaded} name='spades' path='./spades.jpeg' /></Link>
            <Link to="/products/southOxford"><SubMenuComponent onImageLoad={handleImageLoaded} name='SouthOxford' path='./SouthOxford.jpg' /></Link>
            <Link to="/products/maz"><SubMenuComponent onImageLoad={handleImageLoaded} name='maz' path='./maz.jpeg' /></Link>
            </main>
           
        </React.Fragment>
    )
}

export default Sneakers;