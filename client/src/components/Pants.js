import React, {useState, useEffect} from 'react';
import './Pants.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from './SubMenuComponent';
import Loader from './Loader';
import Axios from 'axios';




const Pants = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllPants, setAllPants] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get('http://localhost:4000/category/pants');
              setAllPants(response.data);
          } catch (error) {
              console.error("Error fetching pants data: ", error);
          }
      };

      fetchData();
  }, []);



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
            {AllPants.map(pants => (
                    <Link key={pants._id} to={`/products/${pants.title}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={pants.title} path={pants.imagePath} />
                    </Link>
                ))}
           
            </main>
           
        </React.Fragment>
    )
}

export default Pants;