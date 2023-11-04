import React, {useEffect, useState} from "react";
import './Shirts.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";
import Axios from 'axios';



const Shirts = () => {

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  const [AllShirts, setAllShirts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/category/shirts');
            setAllShirts(response.data);
        } catch (error) {
            console.error("Error fetching shirts data: ", error);
        }
    };

    fetchData();
}, []);


const handleImageLoaded = () => {
  setLoadedImagesCount(prevCount => prevCount + 1);
};

useEffect(() => {
  if (loadedImagesCount === AllShirts.length) {
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
            <main className='submenuBody'>
            {AllShirts.map(shirt => (
                    <Link key={shirt._id} to={`/products/${shirt.category}/${shirt._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={shirt.title} path={shirt.imagePath} />
                    </Link>
                ))}
                
            </main>
           
        </React.Fragment>
    )
}

export default Shirts;