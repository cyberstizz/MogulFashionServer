import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './Control.scss';
import Loader from "./Loader";
import Axios from 'axios';
import ControlComponent from "./ControlComponent";



const Control = () => {

    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [AllProducts, setAllProducts] = useState([]);

    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashionbase-615d24b1a925.herokuapp.com'
    : 'http://localhost:4000';



    const handleDelete = (productId) => {
        // Prompt the user to confirm the deletion

        // Check if the user clicked "OK"
          console.log(`Attempting to delete product with ID: ${productId}`);

          Axios.delete(`${apiUrl}/delete/${productId}`)
            .then(response => {
              // Handle the response if needed
              console.log(response.data);
      
              // Filter out the deleted product from the state
              const updatedProducts = AllProducts.filter(product => product._id !== productId);
              setAllProducts(updatedProducts);
            })
            .catch(error => {
              // Handle any errors here
              console.error("There was an error deleting the product", error);
            });
       
      };


    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await Axios.get(`${apiUrl}/products`);
            if (Array.isArray(response.data)) {
                setAllProducts(response.data);
            } else {
                // Handle case where data isn't an array
                console.error('Data fetched is not an array:', response.data);
                setAllProducts([]); // Set to an empty array to prevent .map error
            }
        } catch (error) {
            console.error("Error fetching products data: ", error);
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
                <Link to={'/newProduct'}><button className="newProductButton">Create new product</button></Link>
            {AllProducts.map(product => (
                        <ControlComponent productCategory={product.category} key={product._id} productId={product._id} onDelete={() => handleDelete(product._id)} onImageLoad={handleImageLoaded} name={product.title} path={product.imagePath} />
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Control;