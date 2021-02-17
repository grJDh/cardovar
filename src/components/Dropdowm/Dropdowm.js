import React from 'react';

import './Dropdowm.scss';

const Dropdowm = ({ label, onFunc, value, name, options }) => {

  return (
    <div className='dropdowm'>
      <label htmlFor={label}>{label}</label>
      <select id={label} name={name} onChange={onFunc} value={value}>
        {options.map((i) => (
          <option value={i}>{i}</option>
          ))}
      </select>
    </div>
  );
}

export default Dropdowm;
