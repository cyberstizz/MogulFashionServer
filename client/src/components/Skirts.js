import React, {useEffect, useState} from "react";
import './Skirts.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";
import Axios from 'axios';



const Skirts = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllSkirts, setAllSkirts] = useState([]);

    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashionbase-615d24b1a925.herokuapp.com'
    : 'http://localhost:4000';


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get(`${apiUrl}/category/skirts`);
              setAllSkirts(response.data);
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
  if (loadedImagesCount === AllSkirts.length) {
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
            {AllSkirts.map(skirt => (
                    <Link key={skirt._id} to={`/products/${skirt.category}/${skirt._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={skirt.title} path={skirt.imagePath} />
                    </Link>
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Skirts;