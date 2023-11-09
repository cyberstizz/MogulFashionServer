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
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com'
    : 'http://localhost:4000';



    const handleDelete = (productId) => {
        // Prompt the user to confirm the deletion
        const userConfirmed = window.confirm("Are you sure you want to delete this item?");
      
        // Check if the user clicked "OK"
        if (userConfirmed) {
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
        } else {
          // User clicked "Cancel", don't delete
          console.log("Deletion was canceled.");
        }
      };


    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await Axios.get(`${apiUrl}/products`);
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
                <Link to={'/newProduct'}><button className="newProductButton">Create new product</button></Link>
            {AllProducts.map(product => (
                        <ControlComponent productCategory={product.category} key={product._id} productId={product._id} onDelete={() => handleDelete(product._id)} onImageLoad={handleImageLoaded} name={product.title} path={product.imagePath} />
                ))}

            </main>
           
        </React.Fragment>
    )
}

export default Control;