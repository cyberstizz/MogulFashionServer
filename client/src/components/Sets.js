import React, {useState, useEffect} from "react";
import './Sets.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";


const Sets = () => {

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
                <Link to="/products/theGarterSet"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Garter Set' path='./theGarterSet.png' /></Link>
                <Link to="/products/theGarterSet"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Garter Set' path='./theGarterSet.png' /></Link>
                <Link to="/products/theGarterSet"><SubMenuComponent onImageLoad={handleImageLoaded} name='The Garter Set' path='./theGarterSet.png' /></Link>
            </main>
           
        </React.Fragment>
    )
}

export default Sets;