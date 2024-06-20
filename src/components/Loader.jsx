import React from 'react';
import LoadingGif from '../gif/loading.gif';

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader_image">
                <img src={LoadingGif} alt="Loading" />
            </div>
        </div>
    );
};

export default Loader;
