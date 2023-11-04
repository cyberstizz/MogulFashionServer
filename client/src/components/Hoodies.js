import React, {useEffect, useState} from "react";
import './Hoodies.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";
import Axios from 'axios';




const Hoodies = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllHoodies, setAllHoodies] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get('http://localhost:4000/category/hoodies');
              setAllHoodies(response.data);
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
  if (loadedImagesCount === AllHoodies.length) {
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
            {AllHoodies.map(hoodie => (
                    <Link key={hoodie._id} to={`/products/${hoodie.category}/${hoodie._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={hoodie.title} path={hoodie.imagePath} />
                    </Link>
                ))}
{/*                 
                <Link to="/products/xHoodie"><SubMenuComponent onImageLoad={handleImageLoaded} name='xhoodie' path='./xhoodie.jpeg' /></Link>
                <Link to="/products/xHoodie"><SubMenuComponent onImageLoad={handleImageLoaded} name='xhoodie' path='./xhoodie.jpeg' /></Link>
                <Link to="/products/xHoodie"><SubMenuComponent onImageLoad={handleImageLoaded} name='xhoodie' path='./xhoodie.jpeg' /></Link>
             */}
            
            
            </main>
           
        </React.Fragment>
    )
}

export default Hoodies;