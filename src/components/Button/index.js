import React from "react";

const Button = ({ disabled, className, onClick, btnText, type, ...rest }) => {
  return (
    <button
      style={{ width: "90px" }}
      disabled={disabled}
      className={className}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {btnText}
    </button>
  );
};

export default Button;
