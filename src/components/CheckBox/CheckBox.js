import React from 'react';

const Checkbox = ({ label, onFunc }) => {

  return (
    <div>
      <input type="checkbox" onChange={onFunc} id={label}/>
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

export default Checkbox;
