import React, {useState, useEffect} from "react";
import './Dresses.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";



const Dresses = () => {

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
                <Link to="/products/theHula"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Hula' path='./theHula.jpeg' /></Link>
                <Link to="/products/theMilitia"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Militia' path='./theMilitia.jpeg' /></Link>
                <Link to="/products/theTiff"><SubMenuComponent onImageLoad={handleImageLoaded} name='the Tiff' path='./theTiff.jpeg' /></Link>
            </main>
           
        </React.Fragment>
    )
}

export default Dresses;