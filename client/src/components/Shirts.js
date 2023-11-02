import React, {useEffect, useState} from "react";
import './Shirts.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";



const Shirts = () => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

const handleImageLoaded = () => {
  setLoadedImagesCount(prevCount => prevCount + 1);
};

useEffect(() => {
    // in this case I will set images loaded as true after all
    //seven images are loaded
  if (loadedImagesCount === 7) {
    setImagesLoaded(true);
  }
}, [loadedImagesCount]);

    return(
        <React.Fragment>
            {!imagesLoaded && <Loader />}

            <nav className='subMenuFullBlock'>
                <ul className='submenuHeader'>
                <Link to="/pants"><li className='submenuNavItem'>Pants</li></Link>
                <Link to="/sneakers"><li className='submenuNavItem'>Sneakers</li></Link>
                <Link to="/hoodies"><li className='submenuNavItem'>Hoodies</li></Link>
                </ul>
            </nav>
            <main className='shirtsubmenuBody'>
                <Link to="/products/Gangsta"><SubMenuComponent onImageLoad={handleImageLoaded} name='Gangsta' path='/Gangsta.png' /></Link>
                <Link to="/products/Here"><SubMenuComponent onImageLoad={handleImageLoaded} name="We're here" path='/Here.png' /></Link>
                <Link to="/products/better"><SubMenuComponent onImageLoad={handleImageLoaded} name='Better' path='/better.png' /></Link>
                <Link to="/products/creamPuff"><SubMenuComponent onImageLoad={handleImageLoaded} name='creamPuff' path='/creamPuff.png' /></Link>
                <Link to="/products/facebookFollowers"><SubMenuComponent onImageLoad={handleImageLoaded} name='facebookFollowers' path='/facebookFollowers.png' /></Link>
                <Link to="/products/mogulOne"><SubMenuComponent onImageLoad={handleImageLoaded} name='mogulOne' path='/mogulShirt.png' /></Link>      
                <Link to="/products/mogulTwo"><SubMenuComponent onImageLoad={handleImageLoaded} name='mogulTwo' path='/mogulShirtTwo.png' /></Link>

            </main>
           
        </React.Fragment>
    )
}

export default Shirts;