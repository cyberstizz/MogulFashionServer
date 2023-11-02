import React, {useState, useEffect} from 'react';
import './Pants.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from './SubMenuComponent';
import Loader from './Loader';




const Pants = () => {

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
                <ul className='submenuHeader' style={{ textDecoration: 'none', overflow: 'visible'}}>
                <Link to="/sneakers"><li className='submenuNavItem'>Sneakers</li></Link>
                <Link to="/pants"><li className='submenuNavItem'>Pants</li></Link>
                <Link to="/hoodies"><li className='submenuNavItem'>Hoodies</li></Link>
                </ul>
            </nav>
            
            <main className='submenuBody'>
            <Link to="/products/jamaaca"><SubMenuComponent onImageLoad={handleImageLoaded} name='Jamaaca' path='./jamaacaJeans.jpeg' /></Link>
            <Link to="/products/colorVienz"><SubMenuComponent onImageLoad={handleImageLoaded} name='ColorVienz' path='./colorVienzJeans.png' /></Link>
            <Link to="/products/mogulPants"><SubMenuComponent onImageLoad={handleImageLoaded} name='MogulPants' path='./mogulPants.jpg' /></Link>
            </main>
           
        </React.Fragment>
    )
}

export default Pants;