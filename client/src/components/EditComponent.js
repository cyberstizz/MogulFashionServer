import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditComponent.scss'
import Axios from 'axios';

const EditComponent = () => {
  const { productId } = useParams();
  const { productCategory } = useParams();
  const navigate = useNavigate();

  const apiUrl = process.env.NODE_ENV === 'production'
  ? 'https://mogulfashionbase-615d24b1a925.herokuapp.com'
  : 'http://localhost:4000';

  const [product, setProduct] = useState({
    title: '',
    category: '',
    headline: '',
    description: '',
  });

  useEffect(() => {
  
    const fetchProductData = async () => {
      const response = await Axios.get(`${apiUrl}/product/${productCategory}/${productId}`);
      const data = await response.data;
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
    
    // Remove _id from product before sending
    const { _id, ...updateData } = product;
    
    try {
      const response = await fetch(`${apiUrl}/update/${productId}`, {
        method: 'PUT',
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
    <main className="fullEditPage">
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
              style={{marginTop: "20"}}
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
          style={{marginTop: "20"}}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleInputChange}
          style={{marginTop: "20"}}
        />
      </label>

      <button
        style={{color: "green"}}
        type="submit">Edit Product
      </button>
    </form>
    </main>
  );
};

export default EditComponent;
