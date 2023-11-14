import React, { useState } from 'react';
import './PasswordPrompt.scss';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const PasswordPrompt = ({ onEnter, onForgotPassword, onClose }) => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEnter = async () => {
    try {
        const response = await Axios.post('/verifyPassword', { password });
        if (response.data.verified) {
          navigate('/control'); // Navigate to the control page
          onClose(); // Close the prompt
        } else {
          alert('Password is incorrect.'); // Alert the user
        }
      } catch (error) {
        alert('An error occurred while verifying the password.');
        console.error(error);
      }  };

  return (
    <div className="password-prompt-container">
      <div className="password-prompt">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style = {{width: '90%'}}
        />
        <div className="buttons">
          <button onClick={handleEnter} className="enter">Enter</button>
          <button onClick={onClose} className="forgot">Close</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
