import React, {useState, useEffect} from "react";
import './Sneakers.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";
import Axios from 'axios';


const Sneakers = () => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllSneakers, setAllSneakers] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get(`${apiUrl}/category/sneakers`);
              setAllSneakers(response.data);
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
  if (loadedImagesCount === AllSneakers.length) {
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

            {AllSneakers.map(sneaker => (
                    <Link key={sneaker._id} to={`/products/${sneaker.category}/${sneaker._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={sneaker.title} path={sneaker.imagePath} />
                    </Link>
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Sneakers;