import React, { useEffect, useState } from "react";
import './ProductPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "./Loader";
import Axios from 'axios';

const ProductPage = () => {
    const navigate = useNavigate();
    const { categoryId, productId } = useParams();

    const [product, setProduct] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com'
    : 'http://localhost:4000';

    const fetchProductData = async () => {
        try {
            const response = await Axios.get(`${apiUrl}/product/${categoryId}/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error("There was an error fetching the product data:", error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [categoryId, productId]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleImageLoaded = () => {
        setImagesLoaded(true);
    };

    if (!product) {
        return <Loader />;
    }

    const { title, headline, imagePath, description } = product;

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
                    <img onLoad={handleImageLoaded} className="productImage" src={product.imagePath} alt={`a ${product.title}`} />
                    <div className="headerFooterImage"></div>
                </div>

                <section className="headlineText">Product Details</section>

                <section className="productDescription">{description}</section>
            </main>
        </React.Fragment>
    );
};

export default ProductPage;
