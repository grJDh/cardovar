import React from 'react';

const Checkbox = ({ label, onFunc }) => {

  return (
    <div>
      <input type="checkbox" onChange={onFunc}/>
      <label>{label}</label>
    </div>
  );
}

export default Checkbox;
