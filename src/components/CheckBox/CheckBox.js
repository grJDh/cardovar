import React from 'react';

import './CheckBox.scss';

const Checkbox = ({ label, onFunc }) => {

  return (
    <div className='checkbox'>
      <input type="checkbox" onChange={onFunc} id={label}/>
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

export default Checkbox;
