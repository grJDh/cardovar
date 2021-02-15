import React from 'react';

import './TextBox.scss';

const TextBox = ({ label, onFunc, autocomplete, name, value=" " }) => {

  return (
    <div className='TextBox'>
      <label htmlFor={label}>{label}</label>
      <input type="text" onChange={onFunc} id={label} autoComplete={autocomplete} name={name} value={value}/>
    </div>
  );
}

export default TextBox;
