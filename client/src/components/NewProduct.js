import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newProduct.scss';
import Axios from 'axios';
import AWS from 'aws-sdk';
import 'dotenv';

const NewProduct = () => {
  const navigate = useNavigate();

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
    // Initialize the AWS S3 SDK
    const s3 = new AWS.S3({
      // Provide your S3 credentials
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION,
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `product-images/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', // This will make the file publicly readable (be cautious with this permission)
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location); // The file URL will be returned on successful upload
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
      const imageUrl = await uploadImageToS3(file);

      // Add the image URL to the product data
      const { _id, ...updateData } = product;
      const productDataWithImage = { ...updateData, imageUrl };

      const response = await Axios.post(`http://localhost:4000/add`, productDataWithImage);
  
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
    <form onSubmit={handleSubmit}>
      {/* ... other fields ... */}
      
      <label>
        Image:
        <input
          type="file"
          onChange={handleFileChange}
        />
      </label>
      
      <button type="submit">Create Product</button>
    </form>
  );
};

export default NewProduct;
