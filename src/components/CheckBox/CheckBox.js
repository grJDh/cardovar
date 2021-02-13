import React from 'react';

import './CheckBox.scss';

const Checkbox = ({ label, onFunc, value, name }) => {

  return (
    <div className='checkbox'>
      <input type="checkbox" onChange={onFunc} id={label} defaultChecked={value} name={name} />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}

export default Checkbox;
