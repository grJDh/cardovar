import React from 'react';

import './Dropdown.scss';

const Dropdown = ({ label, onFunc, value, name, options }) => {

  return (
    <div className='dropdowm'>
      <label htmlFor={label}>{label}</label>
      <select id={label} name={name} onChange={onFunc} defaultValue={value}>
        {options.map((currentOption) => (
          <option key={currentOption[0]} value={currentOption[0]}>{currentOption[1]}</option>
          ))}
      </select>
    </div>
  );
}

export default Dropdown;
