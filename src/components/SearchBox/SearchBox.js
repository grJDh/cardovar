import React from 'react';

import './SearchBox.scss';

const SearchBox = ({ label, onFunc, autocomplete }) => {

  return (
    <div className='SearchBox'>
      <label htmlFor={label}>{label}</label>
      <input type="text" onChange={onFunc} id={label} autoComplete={autocomplete}/>
    </div>
  );
}

export default SearchBox;
