import React, {useEffect, useState} from "react";
import './ProductPage.scss';
import './Skirts.scss';
import { useNavigate, useParams } from 'react-router-dom';
import AllProducts from "./AllProducts";
import Loader from "./Loader";


const ProductPage = () => {
    const navigate = useNavigate();

    const { productId } = useParams();

    const handleBackClick = () => {
        navigate(-1);
    }

    
    const theItem = AllProducts[productId]

    const {title, headline, imagePath, description} = theItem;

    const [imagesLoaded, setImagesLoaded] = useState(false);

    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
  
  const handleImageLoaded = () => {
    setLoadedImagesCount(prevCount => prevCount + 1);
  };
  
  useEffect(() => {
    if (loadedImagesCount === 1) {
      setImagesLoaded(true);
    }
  }, [loadedImagesCount]);

    return(
        <React.Fragment>
            {!imagesLoaded && <Loader />}

            <i onClick={handleBackClick} style={{cursor: 'pointer'}} className="fa fa-arrow-left custom-arrow" aria-hidden="true"></i>
            <section className="underSearchBar"></section>
            <main className="entireProductCard">
            <div className="headerWrapper">
                <header className="productFont">{title}</header>
                <div className="headerFooter"></div>
            </div>
            <section className="headlineText">{headline}</section>
            <div className="headerWrapper">
                <img onLoad={handleImageLoaded} className="productImage" src={imagePath} alt={`a ${title}`} />
                <div className="headerFooterImage"></div>
            </div>

            <section className="headlineText">Product Details</section>

            <section className="productDescription">{description}</section>

            </main>
        </React.Fragment>
    )
}

export default ProductPage;