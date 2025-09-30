
import React from 'react';


const Button = ({ value, onClick, className }) => {
    return (
        <div 
            className={`calc-number ${className || ''}`}
            onClick={() => onClick(value)}
        >
            {value}
        </div>
    );
};

export default Button;