import React from 'react';

import './Button.scss';

const Button = ({ label, onFunc, name, className, type }) => {

  return (
    <div className={`button ${className}`}>
      <button onClick={onFunc} type={type}>{label}</button>
    </div>
  );
}

export default Button;
