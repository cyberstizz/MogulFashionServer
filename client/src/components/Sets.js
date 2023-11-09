import React, {useState, useEffect} from "react";
import './Sets.scss';
import { Link } from 'react-router-dom';
import SubMenuComponent from "./SubMenuComponent";
import Loader from "./Loader";
import Axios from 'axios';


const Sets = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllSets, setAllSets] = useState([]);

    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com/'
    : 'http://localhost:4000';

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get(`${apiUrl}/category/sets`);
              setAllSets(response.data);
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
  if (loadedImagesCount === AllSets.length) {
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
            {AllSets.map(set => (
                    <Link key={set._id} to={`/products/${set.category}/${set._id}`}>
                        <SubMenuComponent onImageLoad={handleImageLoaded} name={set.title} path={set.imagePath} />
                    </Link>
                ))}   
            </main>
           
        </React.Fragment>
    )
}

export default Sets;