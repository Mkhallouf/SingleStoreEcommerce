import React from 'react';

import './CustomButton.css';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
    <button
        className={`${isGoogleSignIn ? 'blue-button-theme' : ''} custom-button`}
        {...otherProps}
    >
        {children}
    </button>
);

export default CustomButton;
