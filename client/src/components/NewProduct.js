import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newProduct.scss';
import Axios from 'axios';
import AWS from 'aws-sdk';

const NewProduct = () => {
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

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImageToS3 = async (file) => {
    console.log('Initializing S3 upload process...'); // Log initialization
  
    const s3 = new AWS.S3({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });
  
    console.log('S3 instance created.'); // Log S3 instance creation
  
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `product-images/${Date.now()}_${file.name}`, // Added timestamp for unique file names
      Body: file,
      ContentType: file.type,
    };
  
    console.log('Params set for S3 upload:', params); // Log the parameters for the upload
  
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error('S3 upload error:', err); // Log any S3 upload errors
          reject(err);
        } else {
          console.log('S3 upload successful:', data); // Log the success response from S3
          resolve(data.Location); // Return the file URL
        }
      });
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const imagePath = await uploadImageToS3(file);
      const { _id, ...updateData } = product;
      const productDataWithImage = { ...updateData, imagePath };

      const response = await Axios.post(`${apiUrl}/add`, productDataWithImage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.data) {
        navigate('/');
      } else {
        console.error('Failed to update the product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newProductForm">
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

      <label>
        Image:
        <input
          type="file"
          onChange={handleFileChange}
        />
      </label>

      <button type="submit">Create New Product</button>
    </form>
  );
};

export default NewProduct;
