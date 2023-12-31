import React, { useEffect, useState } from "react";
import './ProductPage.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "./Loader";
import Axios, { all } from 'axios';

const ProductPage = () => {
    const navigate = useNavigate();
    const { categoryId, productId } = useParams();
    const [allProducts, setAllProducts] = useState();
    const [product, setProduct] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const apiUrl = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com'
    : 'http://localhost:4000';

    const getAllProducts = async () => {
        
        let theCategory = categoryId;
        try {
            const response = await Axios.get(`${apiUrl}/category/${theCategory}`);
            setAllProducts(response.data);
            setIsLoading(false)
        } catch (error){
            console.error("There was an error fetching the product data:", error);
        }
    }

    const fetchProductData = async () => {
        try {
            const response = await Axios.get(`${apiUrl}/product/${categoryId}/${productId}`);
            setProduct(response.data);
        } catch (error) {
            console.error("There was an error fetching the product data:", error);
        }
    };

    useEffect(() => {
        getAllProducts();
        fetchProductData();
    }, []);

    useEffect(() => {
    }, [product]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleImageLoaded = () => {
        setImagesLoaded(true);
    };

    const toggleForward = () => {
        //first determine the index of the current item
        //in context of the allproducts array
        let theIndex = allProducts.indexOf(product)

        //if the index of the current
        //product is at the end of the list(array.length)
        if(theIndex + 1 === allProducts.length || theIndex === -1){
            setProduct(allProducts[0])
             //set the product to be equal to the first item using the 
            //usestate
        }else {
             //otherwise set the current item to be the current
        //index ++
            setProduct(allProducts[theIndex + 1])
        }
    }

    const toggleBackward = () => {
        //first determine the index of the current item
        //in context of the allproducts array
        let theIndex = allProducts.indexOf(product)

        //if the index of the current
        //product is at the end of the list(array.length)
        if(theIndex  === 0 || theIndex === -1){
            setProduct(allProducts[allProducts.length - 1])
             //set the product to be equal to the first item using the 
            //usestate
        }else {
             //otherwise set the current item to be the current
        //index ++
            setProduct(allProducts[theIndex - 1])
        }
    }



    if (!product || isLoading) {
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
                    <div className="theArrows">
                    <div style={{height: '8vh', marginRight: '5vw'}} onClick={toggleBackward}>&#10594;</div>
                    <div style={{height: '8vh', width: '5vw', marginLeft: '5vw'}} onClick={toggleForward}>&#10596;</div>
                    </div>

                    <img onLoad={handleImageLoaded} className="productImage" src={imagePath} alt={`a ${product.title}`} />
                    <div className="headerFooterImage"></div>
                </div>

                <section className="headlineText">Product Details</section>

                <section className="productDescription">{description}</section>
            </main>
        </React.Fragment>
    );
};

export default ProductPage;
