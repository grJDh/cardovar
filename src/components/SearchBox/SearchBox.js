import React from 'react';

const SearchBox = ({ label, onFunc, autocomplete }) => {

  return (
    <div className='SearchBox'>
      <label htmlFor={label}>{label}</label>
      <input type="text" onChange={onFunc} id={label} autoComplete={autocomplete}/>
    </div>
  );
}

export default SearchBox;
