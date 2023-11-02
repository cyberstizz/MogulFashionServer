import React from 'react';
import './Loader.scss'

const Loader = () => {
    return (
        <div className="loader">
            <img className="actualLoader" src="/firstGif.gif" alt="Loading..." />
        </div>
    );
}

export default Loader;
