import React from 'react';

import './TextBox.scss';

const TextBox = ({ label, onFunc, autocomplete, name }) => {

  return (
    <div className='TextBox'>
      <label htmlFor={label}>{label}</label>
      <input type="text" onChange={onFunc} id={label} autoComplete={autocomplete} name={name}/>
    </div>
  );
}

export default TextBox;
