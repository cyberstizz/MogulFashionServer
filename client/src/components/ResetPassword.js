import React, { useState } from 'react';
import './ResetPassword.scss';
import { Link } from 'react-router-dom';
import { Axios } from 'axios';

const ResetPassword = () => {
    
    const [tempPassword, setTempPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const ApiHost = process.env.NODE_ENV === 'production'
    ? 'https://mogulfashion-65ec42dc2783.herokuapp.com'
    : 'http://localhost:4000';

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await Axios.post(`${ApiHost}/resetPassword`, {
                tempPassword,
                newPassword,
            });
            
            // Handle response here. For example, you can clear the form or display a success message.
            console.log(response.data);
        } catch (error) {
            // Handle error here. For example, displaying an error message to the user.
            setErrorMessage('An error occurred while resetting the password.');
        }
    };

    return (
        <div className='fullresetDiv'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Temporary Password:</label>
                    <input
                        type="password"
                        value={tempPassword}
                        onChange={(e) => setTempPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;