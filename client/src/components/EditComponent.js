import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Axios } from 'axios';

const EditComponent = () => {
  const { productId } = useParams();
  const { productCategory } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    category: '',
    headline: '',
    description: '',
  });

  useEffect(() => {
  
    const fetchProductData = async () => {
      const response = await Axios.put(`http://localhost:4000/product/${productCategory}/${productId}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the update to the server
    const response = await fetch(`http://localhost:4000/update/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const result = await response.json();
    if (result) {
      // Handle success - perhaps redirect to the product details page or refresh the data
      navigate('/');
    } else {
      // Handle error
      console.error('Failed to update the product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleInputChange}
        />
      </label>

      <fieldset>
        <legend>Category</legend>
        {['pants', 'sneakers', 'hoodies', 'dresses', 'skirts', 'sets', 'shirts'].map((category) => (
          <label key={category}>
            <input
              type="radio"
              name="category"
              value={category}
              checked={product.category === category}
              onChange={handleInputChange}
            />
            {category}
          </label>
        ))}
      </fieldset>

      <label>
        Headline:
        <input
          type="text"
          name="headline"
          value={product.headline}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Edit Product</button>
    </form>
  );
};

export default EditComponent;
