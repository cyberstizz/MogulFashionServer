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

    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com'
    : 'http://localhost:4000';

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get(`${apiUrl}/category/pants`);
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
  if (loadedImagesCount === AllPants.length) {
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
                    <Link key={pants._id} to={`/products/${pants.category}/${pants._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={pants.title} path={pants.imagePath} />
                    </Link>
                ))}
           
            </main>
           
        </React.Fragment>
    )
}

export default Pants;