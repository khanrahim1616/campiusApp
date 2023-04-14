import React from "react";

const Button = ({ disabled, className, onClick, btnText, type }) => {
  return (
    <button
      disabled={disabled}
      className={className}
      onClick={onClick}
      type={type}
    >
      {btnText}
    </button>
  );
};

export default Button;
