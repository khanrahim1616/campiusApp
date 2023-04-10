import React from "react";

const ReUseButton = ({ disabled, className, onClick, btnText, type }) => {
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

export default ReUseButton;
