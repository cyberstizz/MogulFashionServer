import React, { useState, useEffect } from 'react';
import './Home.scss';
import SexHeader from './SexHeader';
import HomeImage from './HomeImage';
import { Link } from 'react-router-dom';
import Loader from './Loader';


const Home = () => {

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

const handleImageLoaded = () => {
  setLoadedImagesCount(prevCount => prevCount + 1);
};

useEffect(() => {
  if (loadedImagesCount === 6) {
    setImagesLoaded(true);
  }
}, [loadedImagesCount]);





    return (
        <React.Fragment>
          {!imagesLoaded && <Loader />}

        <video className="apparelVideo" width="100%" height="auto" loop="true" autoPlay muted>
          <source src="/fashionvideofinished.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <br />

        <SexHeader header="Men"/>
        <main>
          <section className='HomeImages'>
            <Link to='/sneakers'><HomeImage onImageLoad={handleImageLoaded} title="sneakers" imageUrl="SouthOxford.jpg"/></Link>         
            <Link to='/pants'><HomeImage onImageLoad={handleImageLoaded} title="pants" imageUrl="mogulPants.jpg"/></Link> 
            <Link to='/hoodies'><HomeImage onImageLoad={handleImageLoaded} title="hoodies" imageUrl="MogulHoodie.jpg"/></Link> 
          </section>

         <br />

        <SexHeader header="Woman"/>

          <section className='HomeImages'>
            <Link to='/dresses'><HomeImage onImageLoad={handleImageLoaded} title="dresses" imageUrl="MogulDress.jpg"/></Link>           
            <Link to='/skirts'><HomeImage onImageLoad={handleImageLoaded} title="skirts" imageUrl="MogulSkirt.jpg"/></Link>
            <Link to='/sets'><HomeImage onImageLoad={handleImageLoaded} title="sets" imageUrl="MogulSet.png"/></Link>
          </section>

        </main>
        
        </React.Fragment>
      );
}

export default Home;