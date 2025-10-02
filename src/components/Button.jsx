const Button = ({ value, onClick, className }) => {
    return (
        <button 
            className={`calc-number ${className || ''}`}
            onClick={() => onClick(value)}
        >
            {value}
        </button>
    );
};

export default Button;