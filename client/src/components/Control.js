import React, {useEffect, useState} from "react";
import './Control.scss';
import Loader from "./Loader";
import Axios from 'axios';
import ControlComponent from "./ControlComponent";



const Control = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllProducts, setAllProducts] = useState([]);


    const handleDelete = (productId) => {
        Axios.delete(`http://localhost:4000/delete/${productId}`)

        const updatedProducts = AllProducts.filter(product => product._id !== productId);
        setAllProducts(updatedProducts);
    }


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
                <button className="newProductButton">Create new product</button>
            {AllProducts.map(product => (
                        <ControlComponent productCategory={product.category} key={product._id} productId={product._id} onDelete={() => handleDelete(product._id)} onImageLoad={handleImageLoaded} name={product.title} path={product.imagePath} />
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Control;