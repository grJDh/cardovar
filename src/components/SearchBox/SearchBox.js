import React from 'react';

import './SearchBox.scss';

const SearchBox = ({ label, onFunc }) => {

  return (
    <div className='SearchBox'>
      <label htmlFor={label}>{label}</label>
      <input type="text" onChange={onFunc} id={label}/>
    </div>
  );
}

export default SearchBox;
