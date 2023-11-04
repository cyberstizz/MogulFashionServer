import React, {useEffect, useState} from "react";
import './Control.scss';
import { Link } from 'react-router-dom';
import Loader from "./Loader";
import Axios from 'axios';
import ControlComponent from "./ControlComponent";



const Control = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllProducts, setAllProducts] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get('http://localhost:4000/products');
              setAllProducts(response.data);
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
  if (loadedImagesCount === AllProducts.length) {
    setImagesLoaded(true);
  }
}, [loadedImagesCount]);

    return(
        <React.Fragment>
            {!imagesLoaded && <Loader />}

            <main className='submenuBody'>
            {AllProducts.map(product => (
                    <Link key={product._id} to={`/products/${product.category}/${product._id}`}>
                        <ControlComponent onImageLoad={handleImageLoaded} name={product.title} path={product.imagePath} />
                    </Link>
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Control;