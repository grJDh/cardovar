import React from 'react';

import './Dropdown.scss';

const Dropdown = ({ label, onFunc, value, name, options }) => {

  return (
    <div className='dropdowm'>
      <label htmlFor={label}>{label}</label>
      <select id={label} name={name} onChange={onFunc} value={value}>
        <option value="everywhere">everywhere</option>
        <option value="titles" selected="selected">in titles</option>
        <option value="desc">in descriptions</option>
        {options.map((i) => (
          <option key={i} value={i}>in {i}</option>
          ))}
      </select>
    </div>
  );
}

export default Dropdown;
