import React, {useEffect, useState} from "react";
import './Skirts.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";



const Skirts = () => {

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
                <Link to="/dresses"><li className='submenuNavItem'>Dresses</li></Link>
                <Link to="/skirts"><li className='submenuNavItem'>Skirts</li></Link>
                <Link to="/sets"><li className='submenuNavItem'>Sets</li></Link>
                </ul>
            </nav>
            <main className='submenuBody'>
                <Link to="/products/theQueen"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Queen' path='./theQueen.jpeg' /></Link>
                <Link to="/products/theRoyalty"><SubMenuComponent onImageLoad={handleImageLoaded} name='the Royalty' path='./theRoyalty.jpeg' /></Link>
                <Link to="/products/theRoyalty"><SubMenuComponent onImageLoad={handleImageLoaded} name='the Royalty' path='./theRoyalty.jpeg' /></Link>
            </main>
           
        </React.Fragment>
    )
}

export default Skirts;