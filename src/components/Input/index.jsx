import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ id, value, type, placeholder, onChange, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...rest}
      />
    );
  }
);

export default Input;
