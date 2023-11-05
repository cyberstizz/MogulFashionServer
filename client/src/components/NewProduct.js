import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newProduct.scss';

import Axios from 'axios';

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    category: '',
    headline: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Remove _id from product before sending
    const { _id, ...updateData } = product;
    
    try {
      const response = await Axios.post(`http://localhost:4000/add}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      if (result) {
        navigate('/');
      } else {
        console.error('Failed to update the product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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
              checked="false"
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

      <button type="submit">Create Product</button>
    </form>
  );
};

export default NewProduct;
