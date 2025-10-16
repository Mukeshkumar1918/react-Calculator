import React from "react";

const Button = ({ value, onClick, className, dataKey }) => {
  return (
    <button
      className={className}
      data-key={dataKey}
      value={value}
      onClick={() => onClick(value)}
      type="button"
    >
      {value}
    </button>
  );
};

export default Button;
