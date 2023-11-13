import React, { useState } from 'react';
import './PasswordPrompt.scss';

const PasswordPrompt = ({ onEnter, onForgotPassword }) => {
  const [password, setPassword] = useState('');

  const handleEnter = () => {
    onEnter(password);
  };

  return (
    <div className="password-prompt-container">
      <div className="password-prompt">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button onClick={handleEnter} className="enter">Enter</button>
          <button onClick={onForgotPassword} className="forgot">Forgot Password</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPrompt;
